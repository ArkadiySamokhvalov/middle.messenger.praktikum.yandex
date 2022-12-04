import '../styles/_base.scss';

import Block from '../utils/Block';
import renderDOM from '../utils/renderDOM';
import LoginPage from './Login';
import SignupPage from './Signup';
import ChatPage from './Chat';
import UserSettingsPage from './UserSettings';
import Error404Page from './Error404';
import Error500Page from './Error500';

export default class RoutePage extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToLogin: () => renderDOM('root', new LoginPage()),
      redirectToSignup: () => renderDOM('root', new SignupPage()),
      redirectToChats: () => renderDOM('root', new ChatPage()),
      redirectToUserSettings: () => renderDOM('root', new UserSettingsPage()),
      redirectToError404: () => renderDOM('root', new Error404Page()),
      redirectToError500: () => renderDOM('root', new Error500Page()),
    });
  }

  render() {
    return `
      <div class="body">
        <main class="main">
          <nav>
            <ul>
              <li>{{{Link text="Авторизация" onClick=redirectToLogin}}}</li>
              <li>{{{Link text="Регистрация" onClick=redirectToSignup}}}</li>
              <li>{{{Link text="Чаты" onClick=redirectToChats}}}</li>
              <li>{{{Link text="Настройки пользователя" onClick=redirectToUserSettings}}}</li>
              <li>{{{Link text="Ошибка 404" onClick=redirectToError404}}}</li>
              <li>{{{Link text="Ошибка 500" onClick=redirectToError500}}}</li>
            </ul>
          </nav>
        </main>
      </div>
    `;
  }
}
