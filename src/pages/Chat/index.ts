import './chat.scss';
import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../hocs/withStore';
import { Routes } from '../../routes';
import { Block } from '../../utils/Block';
import Router from '../../utils/Router';
import { formDataToObj } from '../../utils/helpers/formDataToObj';
import { showModal, submitForm } from '../../utils/helpers/modalHelpers';
import { T_ChatData } from '../../typings/types';
import UsersController from '../../controllers/UsersController';

class ChatPageBase extends Block {
  constructor() {
    super({
      menuItems: [
        {
          icon: 'users',
          text: 'Создать чат',
          onClick: () => showModal('add_chat'),
        },
        // {
        //   icon: 'user-plus',
        //   text: 'Добавить контакт',
        //   onClick: () => showModal('add_user'),
        // },
        {
          icon: 'settings',
          text: 'Настройки',
          onClick: () => Router.go(Routes.UserSettings),
        },
        {
          icon: 'arrow-out',
          text: 'Выйти',
          onClick: () => AuthController.logout(),
        },
      ],
      openAddChat: () => showModal('add_chat'),
      openMenu: () => showModal('menu'),
      openAddUsersToChat: () => showModal('add_users_to_chat'),
      submitDeleteChat: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const error = 'Ошибка! Неполучилось удалить чат.';
        submitForm(form, error, () => {
          ChatsController.deleteChat(this.props.selectedChat.id);
        });
      },
      submitAddChat: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const error = 'Ошибка! Неполучилось создать чат.';
        submitForm(form, error, () => {
          const data = formDataToObj(new FormData(form));
          ChatsController.createChat(data.chat_title);
        });
      },
      submitAddUser: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const error = 'Ошибка! Неполучилось добавить контакт.';
        submitForm(form, error, () => {
          const data = formDataToObj(new FormData(form));
          ChatsController.createPersonalChat(data.user_login);
        });
      },
      submitUpdateAvatar: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const error = 'Ошибка! Неполучилось установить аватар.';
        submitForm(form, error, () => {
          const data = new FormData(form);
          data.append('chatId', this.props.selectedChat.id);
          ChatsController.updateChatAvatar(data);
        });
      },
      submitAddUserToChat: async (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const error = 'Ошибка! Неполучилось создать чат.';
        submitForm(form, error, async () => {
          const data = formDataToObj(new FormData(form));
          const user = await UsersController.getUserByLogin(data.user_login);
          ChatsController.addUserToChat(this.props.selectedChat.id, user.id);
        });
      },
    });

    ChatsController.fetchChats();
  }

  public render() {
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
                {{{Button onClick=../openMenu btnName="icon" type="button" text="Открыть меню" icon="menu"}}}
              {{/Form}}

              {{{ChatContacts chats=chats selectedChat=selectedChat openModal=openAddChat userLogin=user.login}}}
            </aside>

            {{{ChatDialog chat=selectedChat messages=messages userId=user.id}}}
          </div>
        </main>

        {{#Modal id="menu" className="modal_left"}}
          <div class="modal__group">
            <div class="modal__avatar">
              {{{Avatar img=../user.avatar className="avatar_full" title=../user.display_name}}}
            </div>

            {{{Name className="modal__name" text=../user.display_name}}}
          </div>

          {{{Menu menuItem=../menuItems}}}
        {{/Modal}}

        {{#Modal id="add_chat"}}
          {{#Title className="modal__title"}}Создать чат{{/Title}}

          {{#Form name="add_chat" onSubmit=../submitAddChat}}
            <div class="form__group">
              {{{Control className="form__control" name="chat_title" label="Название чата"}}}
            </div>

            {{#Button btnName="modal" type="submit" className="modal__button"}}Добавить{{/Button}}
          {{/Form}}
        {{/Modal}}

        {{#Modal id="add_user"}}
          {{#Title className="modal__title"}}Добавить контакт{{/Title}}

          {{#Form name="add_user" onSubmit=../submitAddUser}}
            <div class="form__group">
              {{{Control className="form__control" name="user_login" label="Логин пользователя"}}}
            </div>

            {{#Button btnName="modal" type="submit" className="modal__button"}}Добавить{{/Button}}
          {{/Form}}
        {{/Modal}}

        {{#Modal id="add_user_to_chat"}}
          {{#Title className="modal__title"}}Добавить контакт{{/Title}}

          {{#Form name="add_user" onSubmit=../submitAddUserToChat}}
            <div class="form__group">
              {{{Control className="form__control" name="user_login" label="Логин пользователя"}}}
            </div>

            {{#Button btnName="modal" type="submit" className="modal__button"}}Добавить{{/Button}}
          {{/Form}}
        {{/Modal}}


        {{#Modal id="chat_settings"}}
          {{#Title className="modal__title"}}Настройки чата{{/Title}}

          {{#Form name="chat_settings" onSubmit=../submitUpdateAvatar}}
            <div class="form__group form__group_center">
              {{{ControlFile avatar=../selectedChat.avatar name="avatar" accept="image/*"}}}
            </div>

            {{#Button btnName="modal" type="submit" className="modal__button"}}
              Обновить
            {{/Button}}
          {{/Form}}

          <div class="modal__separate-block">
            {{#Button className="modal__row-button" btnName="secondary" type="button" onClick=../openAddUsersToChat}}
              Добавить участников
              {{{Counter text="0" className="modal__counter"}}}
            {{/Button}}
          </div>
        {{/Modal}}

        {{#Modal id="delete_chat"}}
          {{#Title className="modal__title"}}Вы уверены, что хотите удалить чат?{{/Title}}

          {{#Form name="delete_chat" onSubmit=../submitDeleteChat}}
            {{#Button btnName="modal" type="submit" className="modal__button button_danger"}}Удалить{{/Button}}
          {{/Form}}
        {{/Modal}}
      </div>
    `;
  }
}

const withState = withStore((state) => {
  const selectedChatId = state.selectedChat?.id;

  if (!selectedChatId) {
    return {
      user: state.user?.data,
      chats: state.chats?.data,
      messages: undefined,
      selectedChat: undefined,
    };
  }

  return {
    user: state.user?.data,
    chats: state.chats?.data,
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.chats.data.filter(
      (chat: T_ChatData) => chat.id === state.selectedChat?.id
    )[0],
  };
});
const ChatPage = withState(ChatPageBase);
export default ChatPage;
