import '../../styles/_base.scss';
import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import LoginPage from '../Login';
import RoutePage from '..';
import Validator from '../../utils/Validator';

export default class SignupPage extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToLogin: () => renderDOM('root', new LoginPage()),
      redirectToRoutePage: () => renderDOM('root', new RoutePage()),
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, {
      email: {
        pattern: '^[\\w\\.]+@([\\w-]+.)+[\\w-]+$',
        message:
          'Допустимы латиница, цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
      },
      login: {
        pattern: '^[\\w_-]{2,19}[0-9a-zA-Z]$',
        message:
          'От 3 до 20 символов. Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.',
      },
      first_name: {
        pattern: '^[\\wа-яА-Я-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      second_name: {
        pattern: '^[\\wа-яА-Я-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      phone: {
        pattern: '^[+]?[\\d]{10,15}$',
        message: 'Неверный формат номера.',
      },
      password: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
      password_repeat: {
        message: 'Пароли не совпадают.',
        sameAs: 'password',
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
          {{#Title}}Регистрация{{/Title}}

          <form class="form">
            {{{Control className="form__control" name="email" label="Почта"}}}
            {{{Control className="form__control" name="login" label="Логин"}}}
            {{{Control className="form__control" name="first_name" label="Имя"}}}
            {{{Control className="form__control" name="second_name" label="Фамилия"}}}
            {{{Control className="form__control" name="phone" label="Телефон"}}}

            {{{ControlPassword className="form__control" name="password" label="Пароль"}}}
            {{{ControlPassword className="form__control" name="password_repeat" label="Повторите пароль"}}}

            {{#ButtonPrimary type="submit" className="form__submit"}}
              Создать аккаунт
            {{/ButtonPrimary}}

            {{#Link className="form__link" onClick=redirectToLogin}}
              Уже зарегистрированы? Войти.
            {{/Link}}
          </form>
        </main>
      </div>
    `;
  }
}
