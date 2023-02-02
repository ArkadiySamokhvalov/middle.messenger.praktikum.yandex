import '../../styles/_base.scss';
import { Block } from '../../utils/Block';
import { Routes } from '../../routes';
import AuthController from '../../controllers/AuthController';
import { T_SigninData } from '../../typings/types';
import { withStore } from '../../hocs/withStore';
import { formDataToObj } from '../../utils/helpers/formDataToObj';

class LoginPageBase extends Block {
  constructor() {
    super({
      signupLink: Routes.SignUp,
      submitLogin: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const data = formDataToObj(new FormData(form));
        AuthController.signin(<T_SigninData>data);
      },
      loginValidation: {
        pattern: '^[\\w_-]{2,19}[0-9a-zA-Z]$',
        message:
          'От 3 до 20 символов. Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.',
      },
      passwordValidation: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
    });
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

          {{#Form name="login" onSubmit=../submitLogin}}
            {{{Control className="form__control" name="login" label="Логин" validation=../loginValidation}}}

            {{{ControlPassword className="form__control" name="password" label="Пароль" validation=../passwordValidation}}}

            {{#Button btnName="primary" type="submit" className="button_full form__submit"}}
              Войти
            {{/Button}}

            {{#Link className="form__link" to=../signupLink}}
              Нет аккаунта?
            {{/Link}}

            <div class="form__error"></div>
          {{/Form}}
          {{{Icon className="main__loader" icon="loader"}}}
        {{/Main}}
      </div>
    `;
  }
}

const withUser = withStore((state) => {
  return {
    isLoading: state.user?.isLoading,
    error: state.user?.error,
  };
});
const LoginPage = withUser(LoginPageBase);
export default LoginPage;
