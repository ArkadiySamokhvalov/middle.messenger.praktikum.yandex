import '../../styles/_base.scss';
import { Block } from '../../utils/Block';
import AuthController from '../../controllers/AuthController';
import { T_SignupData } from '../../typings/types';
import { Routes } from '../../routes';
import { withStore } from '../../hocs/withStore';
import { formDataToObj } from '../../utils/helpers/formDataToObj';

class SignupPageBase extends Block {
  constructor() {
    super({
      loginLink: Routes.Index,
      emailValidation: {
        pattern: '^[\\w\\.]+@([\\w-]+.)+[\\w-]+$',
        message:
          'Допустимы латиница, цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
      },
      loginValidation: {
        pattern: '^[\\w_-]{2,19}[0-9a-zA-Z]$',
        message:
          'От 3 до 20 символов. Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.',
      },
      firstNameValidation: {
        pattern: '^[\\wа-яА-ЯёЁ-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      secondNameValidation: {
        pattern: '^[\\wа-яА-ЯёЁ-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      phoneValidation: {
        pattern: '^[+]?[\\d]{10,15}$',
        message: 'Неверный формат номера.',
      },
      passwordValidation: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
      passwordRepeatValidation: {
        message: 'Пароли не совпадают.',
        sameAs: 'password',
      },
      submitSignup: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const data = formDataToObj(new FormData(form));
        AuthController.signup(<T_SignupData>data);
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
          {{#Title}}Регистрация{{/Title}}

          {{#Form name="signup" onSubmit=../submitSignup}}
            {{{Control className="form__control" name="email" label="Почта" validation=../emailValidation}}}
            {{{Control className="form__control" name="login" label="Логин" validation=../loginValidation}}}
            {{{Control className="form__control" name="first_name" label="Имя" validation=../firstNameValidation}}}
            {{{Control className="form__control" name="second_name" label="Фамилия" validation=../secondNameValidation}}}
            {{{Control className="form__control" name="phone" label="Телефон" validation=../phoneValidation}}}

            {{{ControlPassword className="form__control" name="password" label="Пароль" validation=../passwordValidation}}}
            {{{ControlPassword className="form__control" name="password_repeat" label="Повторите пароль" validation=../passwordRepeatValidation}}}

            {{#Button btnName="primary" type="submit" className="button_full form__submit"}}
              Создать аккаунт
            {{/Button}}

            {{#Link className="form__link" to=../loginLink}}
              Уже зарегистрированы? Войти.
            {{/Link}}

            {{#if ../error}}
              <div class="form__error">{{../error}}</div>
            {{/if}}
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
const SignupPage = withUser(SignupPageBase);
export default SignupPage;
