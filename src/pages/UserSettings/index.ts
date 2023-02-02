import { Block } from '../../utils/Block';
import { Routes } from '../../routes';
import { withStore } from '../../hocs/withStore';
import Store from '../../utils/Store';
import { T_UserProfileData } from '../../typings/types';
import { formDataToObj } from '../../utils/helpers/formDataToObj';
import UsersController from '../../controllers/UsersController';

class UserSettingsPageBase extends Block {
  constructor() {
    const state = Store.getState();

    super({
      ...state.user.data,
      chatPage: Routes.Chat,
      changePasswordPage: Routes.ChangePassword,
      submitUserSettings: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const formData = new FormData(form);
        const data = formDataToObj(formData);
        delete data.avatar;
        UsersController.updateUserAvatar(formData);
        UsersController.updateUserProfile(<T_UserProfileData>data);
      },
      emailValidation: {
        pattern:
          '^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$',
        message:
          'Допустимы латиница, цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
      },
      loginValidation: {
        pattern: '^[\\w_-]{2,19}[0-9a-zA-Z]$',
        message:
          'От 3 до 20 символов. Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.',
      },
      firstNameValidation: {
        pattern: '^[\\wёЁа-яА-Я-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      secondNameValidation: {
        pattern: '^[\\wёЁа-яА-Я-]+$',
        message:
          'Допустимы латиница или кириллица, дефис. Не используйте пробелы, цифры и другие спецсимволы.',
      },
      phoneValidation: {
        pattern: '^[+]?[\\d]{10,15}$',
        message: 'Неверный формат номера.',
      },
    });

    console.log('constructor', this.props);
  }

  protected componentDidMount(): void {
    console.log('componentDidMount', this.props);
  }

  public render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content row-between"}}
            <div class="row-between">
              {{#Link to=../chatPage}}
                <div class="visually-hidden">Вернуться назад</div>
                {{{Icon icon="back"}}}
              {{/Link}}
              {{{Logo}}}
            </div>
          {{/Container}}
          {{/Header}}

          {{#Main isLoading=isLoading}}
          {{#Title}}Настройки профиля{{/Title}}

          {{#Form name="settings" onSubmit=../submitUserSettings}}
            <div class="form__group row-between">
              {{{ControlFile avatar=../avatar name="avatar" accept="image/*"}}}

              {{#Link to=../changePasswordPage}}
                Изменить пароль
                {{{Icon className="icon_reflected" icon="back"}}}
              {{/Link}}
            </div>

            {{{Control className="form__control" name="first_name" label="Имя" value=../first_name validation=../firstNameValidation}}}
            {{{Control className="form__control" name="second_name" label="Фамилия" value=../second_name validation=../secondNameValidation}}}
            {{{Control className="form__control" name="display_name" label="Отображаемое имя" value=../display_name}}}
            {{{Control className="form__control" name="login" label="Логин" value=../login validation=../loginValidation}}}
            {{{Control className="form__control" name="email" label="Почта" value=../email validation=../emailValidation}}}
            {{{Control className="form__control" name="phone" label="Телефон" value=../phone validation=../phoneValidation}}}

            {{#Button btnName="primary" className="form__submit button_full" type="submit"}}Сохранить{{/Button}}
          {{/Form}}
          {{{Icon className="main__loader" icon="loader"}}}
        {{/Main}}
      </div>
    `;
  }
}

const withUser = withStore((state) => {
  return {
    ...state.user.data,
    isLoading: state.user.isLoading,
  };
});
const UserSettingsPage = withUser(UserSettingsPageBase);
export default UserSettingsPage;
