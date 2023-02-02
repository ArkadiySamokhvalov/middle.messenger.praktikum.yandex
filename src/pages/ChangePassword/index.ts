import { Block } from '../../utils/Block';
import { Routes } from '../../routes';
import UsersController from '../../controllers/UsersController';
import { withStore } from '../../hocs/withStore';
import { formDataToObj } from '../../utils/helpers/formDataToObj';
import { T_UserChangePasswordData } from '../../typings/types';

class ChangePasswordPageBase extends Block {
  constructor() {
    super({
      UserSettingsPage: Routes.UserSettings,
      oldPasswordValidation: {
        pattern: '',
        message: '',
      },
      newPasswordValidation: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
      newPasswordRepeatValidation: {
        message: 'Пароли не совпадают.',
        sameAs: 'newPassword',
      },
      submitChangePassword: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const formData = new FormData(form);
        formData.delete('new_password_repeat');

        const data = formDataToObj(formData);

        UsersController.updateUserPassword(<T_UserChangePasswordData>data);
      },
    });
  }

  public render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content"}}
            {{#Link to=../UserSettingsPage className="someClass"}}
              <div class="visually-hidden">Вернуться назад</div>
              {{{Icon icon="back"}}}
            {{/Link}}
            {{{Logo}}}
          {{/Container}}
        {{/Header}}

        {{#Main isLoading=isLoading}}
          {{#Title}}Изменить пароль{{/Title}}

          {{#Form onSubmit=../submitChangePassword}}
            {{{ControlPassword className="form__control" name="oldPassword" label="Старый пароль" validation=../oldPasswordValidation}}}
            {{{ControlPassword className="form__control" name="newPassword" label="Новый пароль" validation=../newPasswordValidation}}}
            {{{ControlPassword className="form__control" name="newPasswordRepeat" label="Повторите новый пароль" validation=../newPasswordRepeatValidation}}}

            {{#Button btnName="primary" className="button_full form__submit" type="submit"}}Сохранить{{/Button}}
          {{/Form}}
          {{{Icon className="main__loader" icon="loader"}}}
        {{/Main}}
      </div>
    `;
  }
}

const withUser = withStore((state) => {
  return {
    ...state.user,
  };
});
const ChangePasswordPage = withUser(ChangePasswordPageBase);
export default ChangePasswordPage;
