import './chat.scss';
import avatar1 from '../../../static/img/avatar1.jpg';
import avatar2 from '../../../static/img/avatar2.jpg';
import avatar3 from '../../../static/img/avatar3.jpg';
import avatar4 from '../../../static/img/avatar4.jpg';
import avatar5 from '../../../static/img/avatar5.jpg';
import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import RoutePage from '..';
import renderDOM from '../../utils/renderDOM';

export default class ChatPage extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToRoutePage: () => renderDOM('root', new RoutePage()),
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const searchForm = <HTMLFormElement>(
      page.querySelector('form.chat__contact-header')
    );
    const chatForm = <HTMLFormElement>(
      page.querySelector('form.chat__dialog-footer')
    );

    const chatFormValidator = new Validator(chatForm, {
      message: {
        message: 'Поле не должно быть пустым',
      },
    });

    const searchFormValidator = new Validator(searchForm, {
      contact_search: {
        message: 'Поле не должно быть пустым',
      },
    });

    chatFormValidator.init();
    searchFormValidator.init();
  }

  render() {
    return `
      <div class="body">
        <header class="header">
          <div class="container header__content row-between">
            <div class="header__group">
              {{{ButtonIcon text="Вернуться назад" icon="back" onClick=redirectToRoutePage}}}
              {{{Logo}}}
            </div>
            <div class="header__group header__icons">
              {{{ButtonIcon text="Поиск по контактам" icon="search"}}}
              {{{ButtonIcon text="Открыть меню" icon="menu"}}}
            </div>
          </div>
        </header>

        <main class="chat">
          <div class="chat__content">
            <aside class="chat__aside">
              <form class="chat__contact-header">
                {{{Control name="contact_search" placeholder="Поиск"}}}
                {{{ButtonIcon text="Открыть меню" icon="menu"}}}
              </form>

              <div class="chat__contacts custom-scrollbar">
                {{{Contact avatar=avatar1 name="Мария" lastMessage="Как впечатления?" time="9:36" counter="1"}}}
                {{{Contact avatar=avatar2 online=true name="Сестра" lastMessage="смотри кто мне в бравл старс выпал" time="Вт"}}}
                {{{Contact avatar=avatar3 name="Алексей Тренер" lastMessage="Как впечатления?" time="Вт"}}}
                {{{Contact avatar=avatar4 online=true name="Катя Петренко" lastMessage="Я просто медленно подбираюсь к обустройству кухни...и для меня это ад" time="Пн"}}}
                {{{Contact avatar=avatar5 name="Иван Дизайнер" lastMessage="Добрый, хорошо, буду ждать новостей" time="13.11.2022"}}}
              </div>
            </aside>

            <div class="chat__dialog">
              <div class="chat__dialog-header">
                {{{ Avatar img=avatar2 marker="true" }}}

                <div class="row-column">
                  {{#Name}}Сестра{{/Name}}
                  {{#Time}}онлайн{{/Time}}
                </div>

                {{{ButtonIcon text="Открыть меню чата" icon="dots"}}}
              </div>

              <div class="chat__dialog-body">
                <div class="messages custom-scrollbar">
                  <div class="messages__content">
                    <div class="messages__data">
                      <span class="messages__data-text">
                        15.11.2022
                      </span>
                    </div>
                    {{{Message text="Ты уже вернулась домой?" className="messages__item_own" time="15:28"}}}
                    {{{Message text="да" time="15:32"}}}
                    {{{Message text="смотри кто мне в бравл старс выпал" img="message1" time="15:32"}}}
                  </div>
                </div>
                <div class="chat__dialog-empty">
                  Выберите, кому хотели бы написать
                </div>
              </div>
              <form class="chat__dialog-footer">
                {{{ButtonIcon text="Прикрепить файл" icon="paperclip"}}}
                {{{Control name="message" placeholder="Написать сообщение..."}}}
                {{{ButtonIcon text="Выбрать эмоджи" icon="smile"}}}
                {{{ButtonIcon type="submit" text="Отправить сообщение" icon="send"}}}
              </form>
            </div>
          </div>

          <div class="chat__footer">
            <div class="container">
              <p class="chat__footer-text">
                Нажмите на кнопку, чтобы создать чат или добавить контакт.
              </p>

              {{{ButtonIcon className="chat__footer-button" icon="plus-user"}}}
            </div>
          </div>
        </main>
      </div>
    `;
  }
}
