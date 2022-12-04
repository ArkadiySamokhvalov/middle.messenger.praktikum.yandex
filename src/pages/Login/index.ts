import '../../styles/_base.scss';
import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import SignupPage from '../Signup';
import RoutePage from '..';
import Validator from '../../utils/Validator';

export default class LoginPage extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToRoutePage: () => renderDOM('root', new RoutePage()),
      redirectToSignupPage: () => renderDOM('root', new SignupPage()),
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, {
      login: {
        pattern: '^[\\w_-]{2,19}[0-9a-zA-Z]$',
        message:
          'От 3 до 20 символов. Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.',
      },
      password: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
    });

    formValidator.init();
  }

  render() {
    return `
      <div class="body">
        <header class="header">
          <div class="container header__content">
            {{{ButtonIcon text="Вернуться назад" icon="back" onClick=redirectToRoutePage}}}
            {{{Logo}}}
          </div>
        </header>

        <main class="main">
          {{#Title}}Авторизация{{/Title}}

          <form class="form">
            {{{Control className="form__control" name="login" label="Логин"}}}

            {{{ControlPassword className="form__control" name="password" label="Пароль"}}}

            {{#ButtonPrimary type="submit" className="form__submit"}}
              Войти
            {{/ButtonPrimary}}

            {{#Link className="form__link" onClick=redirectToSignupPage}}
              Нет аккаунта?
            {{/Link}}
          </form>
        </main>
      </div>
    `;
  }
}
