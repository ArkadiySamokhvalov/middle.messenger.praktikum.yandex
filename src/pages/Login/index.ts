import '../../styles/_base.scss';
import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import Routes from '../../routes';
import AuthController from '../../controllers/AuthController';
import { SigninData } from '../../typings/types';
import AuthAPI from '../../api/AuthAPI';
import Router from '../../utils/Router';
import withStore from '../../hocs/withStore';

const authController = new AuthController(new AuthAPI(), new Router());

const loginErrors = {
  'Login or password is incorrect': 'Неверный логин или пароль',
};

class LoginPageBase extends Block {
  constructor() {
    super();

    this.setProps({
      signupLink: Routes.SignUp,
    });
  }

  protected componentDidMount() {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, this._onSubmit, {
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

  private async _onSubmit(e: Event) {
    const form = <HTMLFormElement>e.currentTarget;
    const formData = new FormData(form);
    const data = [...formData].reduce(
      (acc, [key, val]) => ({ ...acc, [key]: val }),
      {}
    );

    authController.signin(<SigninData>data);
  }

  public render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content"}}
            {{{Logo}}}
          {{/Container}}
        {{/Header}}

        {{#Main isLoading=isLoading}}
          {{#Title}}Авторизация{{/Title}}

          {{#Form}}
            {{{Control className="form__control" name="login" label="Логин"}}}

            {{{ControlPassword className="form__control" name="password" label="Пароль"}}}

            {{#if ../error}}
              <div class="form__error">{{../error}}</div>
            {{/if}}

            {{#Button btnName="primary" type="submit" className="button_full form__submit"}}
              Войти
            {{/Button}}

            {{#Link className="form__link" to=../signupLink}}
              Нет аккаунта?
            {{/Link}}
          {{/Form}}
          {{{Icon className="main__loader" icon="loader"}}}
        {{/Main}}
      </div>
    `;
  }
}

const withUser = withStore((state) => {
  return { ...state.user };
});
const LoginPage = withUser(LoginPageBase);
export default LoginPage;
