import './chat.scss';
import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import withStore from '../../hocs/withStore';
import AuthController from '../../controllers/AuthController';
import AuthAPI from '../../api/AuthAPI';
import Router from '../../utils/Router';
import Routes from '../../routes';

const router = new Router();
const authController = new AuthController(new AuthAPI(), router);

function showModal(id: string) {
  const modal = document.getElementById(id);
  modal?.classList.add('modal_active');
}

class ChatPageBase extends Block {
  constructor() {
    super();

    this.setProps({
      menuItems: [
        {
          icon: 'users',
          text: 'Создать чат',
          onClick: () => {},
        },
        {
          icon: 'user-plus',
          text: 'Добавить контакт',
          onClick: () => {},
        },
        {
          icon: 'settings',
          text: 'Настройки',
          onClick: () => {
            router.go(Routes.UserSettings);
          },
        },
        {
          icon: 'arrow-out',
          text: 'Выйти',
          onClick: () => {
            authController.logout();
          },
        },
      ],
      chatMenuItems: [
        {
          icon: 'trash',
          text: 'Удалить чат',
          onClick: () => {
            showModal('remove_chat');
          },
        },
      ],
      openMenu: () => {
        showModal('menu');
      },
      openAddUserModal: () => {
        showModal('add_user');
      },
    });
  }

  protected componentDidMount(): void {
    this.setProps({
      userInitials: () =>
        `${this.props.user.data.first_name[0]} ${this.props.user.data.second_name[0]}`,
    });

    const page = <HTMLElement>this.getContent();

    const searchForm = <HTMLFormElement>(
      page.querySelector('form[name="search"]')
    );
    const searchFormValidator = new Validator(searchForm, () => {}, {
      contact_search: {
        message: 'Поле не должно быть пустым',
      },
    });
    searchFormValidator.init();

    const chatForm = <HTMLFormElement>(
      page.querySelector('form[name="message"]')
    );
    const chatFormValidator = new Validator(chatForm, () => {}, {
      message: {
        message: 'Поле не должно быть пустым',
      },
    });
    chatFormValidator.init();
  }

  render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content row-between"}}
            <div class="header__group">
              {{{Logo}}}
            </div>
            <div class="header__group header__icons">
              {{{Button className="header__icon" btnName="icon" type="button" text="Поиск по контактам" icon="search"}}}
              {{{Button onClick=../openMenu className="header__icon" btnName="icon" type="button" text="Открыть меню" icon="menu"}}}
            </div>
          {{/Container}}
        {{/Header}}

        <main class="chat">
          <div class="chat__content">
            <aside class="chat__aside">
              {{#Form name="search" className="chat__contact-header"}}
                {{{Control name="contact_search" placeholder="Поиск"}}}
                {{{Button onClick=../openMenuModal btnName="icon" type="button" text="Открыть меню" icon="menu"}}}
              {{/Form}}

              <div class="chat__contacts chat__contacts_empty custom-scrollbar">
                {{#Button onClick="openAddUserModal" type="button" btnName="secondary" className="chat__contacts-button button_full"}}
                  Добавить контакт
                  {{{Icon icon="user-plus"}}}
                {{/Button}}
                <div class="chat__contacts-text">Нет контактов</div>
              </div>
            </aside>

            <div class="chat__dialog">
              {{#if chat.active}}
                <div class="chat__dialog-header">
                  {{{ Avatar img=avatar2 marker="true" }}}

                  <div class="row-column">
                    {{#Name}}Сестра{{/Name}}
                    {{#Time}}онлайн{{/Time}}
                  </div>

                  {{{Dropdown text="Открыть меню" icon="more-vertical" menuItems=chatMenuItems }}}
                </div>
              {{/if}}

              <div class="chat__dialog-body">
                <div class="chat__dialog-empty">
                  Выберите, кому хотели бы написать
                </div>
              </div>

              {{#Form name="message" className="chat__dialog-footer"}}
                {{{Button btnName="icon" type="button" text="Прикрепить файл" icon="paperclip"}}}
                {{{Control name="message" placeholder="Написать сообщение..."}}}
                {{{Button btnName="icon" type="button" text="Выбрать эмоджи" icon="smile"}}}
                {{{Button btnName="icon" type="submit" text="Отправить сообщение" icon="send"}}}
              {{/Form}}
            </div>
          </div>
        </main>

        <div id="menu" class="modal modal_left modal_fade-left">
          <div class="modal__content">
            <div class="modal__header">
              {{{Button onClick=closeModal btnName="icon" type="button" text="Закрыть окно" icon="close" className="modal__close"}}}
            </div>

            <div class="modal__body">
              {{#if user.data.avatar}}
                {{{Avatar img=user.data.avatar}}}
              {{else}}
                <div class="avatar avatar_empty">{{userInitials}}</div>
              {{/if}}

              {{#Name}}
                {{../user.data.first_name}} {{../user.data.second_name}}
              {{/Name}}

              {{{Menu menuItem=menuItems}}}
            </div>
          </div>
        </div>

        <div id="add_user" class="modal">
          <div class="modal__content">
            <div class="modal__header">
              {{{Button onClick=closeModal btnName="icon" type="button" text="Закрыть окно" icon="close" className="modal__close"}}}
            </div>

            <div class="modal__body">
              {{#Form name="create_chat"}}
                {{{ControlFile name="chat_avatar" accept="image/*"}}}
                <div class="form__group">
                  {{{Control className="form__control" name="chat_title" label="Название группы"}}}

                  <div class="form__btns">
                    {{{Button btnName="primary" text="Далее"}}}
                    {{{Button className="modal__close" btnName="primary" text="Отмена"}}}
                  </div>
                </div>
              {{/Form}}
            </div>
          </div>
        </div>

        <div id="remove_chat" class="modal">
          <div class="modal__content">
            <div class="modal__header">
              {{{Button onClick=closeModal btnName="icon" type="button" text="Закрыть окно" icon="close" className="modal__close"}}}
            </div>

            <div class="modal__body">
              <div>Вы уверены, что хотите удалить чат?</div>
              <div class="form__btns">
                {{{Button btnName="primary" text="Далее"}}}
                {{{Button className="modal__close" btnName="primary" text="Отмена"}}}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

const withState = withStore((state) => state);
const ChatPage = withState(ChatPageBase);
export default ChatPage;
