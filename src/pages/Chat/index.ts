import AuthAPI from '../../api/AuthAPI';
import Modal from '../../components/Modal';
import AuthController from '../../controllers/AuthController';
import ModalController from '../../controllers/ModalController';
import withStore from '../../hocs/withStore';
import Routes from '../../routes';
import Block from '../../utils/Block';
import Router from '../../utils/Router';

const router = new Router();
const authController = new AuthController(new AuthAPI(), router);
const modalController = new ModalController();

class ChatPageBase extends Block {
  constructor() {
    super();

    this.setProps({
      modal: new Modal({}).getContent(),
    });
  }

  protected componentDidMount() {
    const page = <HTMLElement>this.element;
    console.log(this.props);

    modalController.init(page);

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
          onClick: () => {},
        },
      ],
      // openAddChatModal: () => modalController.showModal('menu'),
    });

    console.log(this.props);
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
              {{{Button onClick=../openAddChatModal className="header__icon" btnName="icon" type="button" text="Открыть меню" icon="menu"}}}
            </div>
          {{/Container}}
        {{/Header}}

        {{modal}}
      </div>
    `;
  }
}

const withState = withStore((state) => state);
const ChatPage = withState(ChatPageBase);
export default ChatPage;
