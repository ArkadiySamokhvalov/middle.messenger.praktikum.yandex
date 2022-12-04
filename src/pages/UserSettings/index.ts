import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import RoutePage from '..';
import ChangePasswordPage from '../ChangePassword';
import Validator from '../../utils/Validator';

export default class UserSettingsPage extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToRoutePage: () => renderDOM('root', new RoutePage()),
      redirectToChangePassword: () =>
        renderDOM('root', new ChangePasswordPage()),
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, {
      avatar: {},
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
          {{#Title}}Настройки профиля{{/Title}}

          <form class="form">
            <div class="form__group row-between">
              {{{ControlFile name="avatar" accept="image/*"}}}

              {{#Link onClick=redirectToChangePassword}}
                Изменить пароль
                {{{Icon className="icon_reflected" icon="back"}}}
              {{/Link}}
            </div>

            {{{ Control className="form__control" name="first_name" label="Имя" value="Аркадий" }}}
            {{{ Control className="form__control" name="second_name" label="Фамилия" value="Самохвалов" }}}
            {{{ Control className="form__control" name="login" label="Логин" value="mylogin" }}}
            {{{ Control className="form__control" name="email" label="Почта" value="arkadii.samohvalov@bk.ru" }}}
            {{{ Control className="form__control" name="phone" label="Телефон" value="+79515024652" }}}

            {{#ButtonPrimary className="form__submit" type="submit"}}Сохранить{{/ButtonPrimary}}
          </form>
        </main>
      </div>
    `;
  }
}
