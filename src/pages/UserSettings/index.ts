import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import Routes from '../../routes';
import UsersController from '../../controllers/UsersController';
import UsersAPI from '../../api/UsersAPI';
import { UserProfileData } from '../../typings/types';
import withStore from '../../hocs/withStore';

const userController = new UsersController(new UsersAPI());

class UserSettingsPageBase extends Block {
  constructor() {
    super();
  }

  protected componentDidMount(): void {
    this.setProps({
      changePasswordPage: Routes.ChangePassword,
      userAvatar: this.props.data.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${this.props.data.avatar}`
        : null,
      displayName: this.props.data.display_name
        ? this.props.data.display_name
        : `${this.props.data.first_name} ${this.props.data.second_name}`,
    });

    const page = <HTMLElement>this.getContent();

    const formProfile = <HTMLFormElement>(
      page.querySelector('form[name="profile"]')
    );

    const formValidator = new Validator(formProfile, this._submitProfile, {
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
        pattern: '^[\\wёЁа-яА-Я-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      second_name: {
        pattern: '^[\\wёЁа-яА-Я-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      display_name: {},
      phone: {
        pattern: '^[+]?[\\d]{10,15}$',
        message: 'Неверный формат номера.',
      },
    });

    formValidator.init();

    const formAvatar = <HTMLFormElement>(
      page.querySelector('form[name="avatar"]')
    );
    const inputAvatar = <HTMLInputElement>(
      page.querySelector('input[name="avatar"]')
    );

    inputAvatar.addEventListener('change', () => {
      console.log('jopa');
      const formData = new FormData(formAvatar);
      userController.updateUserAvatar(formData);
    });
  }

  private _submitProfile(e: Event) {
    const form = <HTMLFormElement>e.currentTarget;
    const formData = new FormData(form);
    const data = [...formData].reduce(
      (acc, [key, val]) => ({ ...acc, [key]: val }),
      {}
    );

    console.log('submit ', data);

    userController.updateUserProfile(<UserProfileData>data);
  }

  public render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content row-between"}}
            <div class="row-between">
              {{#Link to='back'}}
                <div class="visually-hidden">Вернуться назад</div>
                {{{Icon icon="back"}}}
              {{/Link}}
              {{{Logo}}}
            </div>
          {{/Container}}
        {{/Header}}

        {{#Main}}
          {{#Title}}Настройки профиля{{/Title}}

          {{#Form name="avatar"}}
            <div class="form__group row-between">
              {{{ControlFile avatar=../userAvatar name="avatar" accept="image/*"}}}

              {{#Link to=../changePasswordPage}}
                Изменить пароль
                {{{Icon className="icon_reflected" icon="back"}}}
              {{/Link}}
            </div>
          {{/Form}}

          {{#Form name="profile"}}
            {{{ Control className="form__control" name="first_name" label="Имя" value=../data.first_name }}}
            {{{ Control className="form__control" name="second_name" label="Фамилия" value=../data.second_name }}}
            {{{ Control className="form__control" name="display_name" label="Отображаемое имя" value=../displayName}}}
            {{{ Control className="form__control" name="login" label="Логин" value=../data.login }}}
            {{{ Control className="form__control" name="email" label="Почта" value=../data.email }}}
            {{{ Control className="form__control" name="phone" label="Телефон" value=../data.phone }}}

            {{#Button btnName="primary" className="form__submit button_full" type="submit"}}Сохранить{{/Button}}
          {{/Form}}
        {{/Main}}
      </div>
    `;
  }
}

const withUser = withStore((state) => {
  return { ...state.user };
});
const UserSettingsPage = withUser(UserSettingsPageBase);
export default UserSettingsPage;
