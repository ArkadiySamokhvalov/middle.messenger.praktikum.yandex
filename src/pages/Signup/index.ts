import '../../styles/_base.scss';
import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../typings/types';
import Routes from '../../routes';
import AuthAPI from '../../api/AuthAPI';
import Router from '../../utils/Router';

const authController = new AuthController(new AuthAPI(), new Router());

export default class SignupPage extends Block {
  constructor() {
    super();

    this.setProps({
      loginLink: Routes.Index,
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, this._onSubmit, {
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

  private _onSubmit(e: Event) {
    const form = <HTMLFormElement>e.currentTarget;
    const formData = new FormData(form);
    const data = [...formData].reduce(
      (acc, [key, val]) => ({ ...acc, [key]: val }),
      {}
    );

    authController.signup(<SignupData>data);
  }

  public render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content"}}
            {{{Logo}}}
          {{/Container}}
        {{/Header}}

        {{#Main}}
          {{#Title}}Регистрация{{/Title}}

          {{#Form}}
            {{{Control className="form__control" name="email" label="Почта"}}}
            {{{Control className="form__control" name="login" label="Логин"}}}
            {{{Control className="form__control" name="first_name" label="Имя"}}}
            {{{Control className="form__control" name="second_name" label="Фамилия"}}}
            {{{Control className="form__control" name="phone" label="Телефон"}}}

            {{{ControlPassword className="form__control" name="password" label="Пароль"}}}
            {{{ControlPassword className="form__control" name="password_repeat" label="Повторите пароль"}}}

            {{#Button btnName="primary" type="submit" className="button_full form__submit"}}
              Создать аккаунт
            {{/Button}}

            {{#Link className="form__link" to=../loginLink}}
              Уже зарегистрированы? Войти.
            {{/Link}}
          {{/Form}}
        {{/Main}}
      </div>
    `;
  }
}
