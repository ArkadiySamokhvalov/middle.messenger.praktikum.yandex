import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import Routes from '../../routes';
import UsersController from '../../controllers/UsersController';
import UsersAPI from '../../api/UsersAPI';
import { UserChangePasswordData } from '../../typings/types';
import withStore from '../../hocs/withStore';

const userController = new UsersController(new UsersAPI());

class ChangePasswordPageBase extends Block {
  constructor() {
    super();

    this.setProps({
      UserSettingsPage: () => Routes.UserSettings,
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, this._onSubmit, {
      oldPassword: {},
      newPassword: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
      newPasswordRepeat: {
        message: 'Пароли не совпадают.',
        sameAs: 'newPassword',
      },
    });

    formValidator.init();
  }

  private _onSubmit(e: Event) {
    const form = <HTMLFormElement>e.currentTarget;
    const formData = new FormData(form);

    formData.delete('new_password_repeat');

    const data = [...formData].reduce(
      (acc, [key, val]) => ({ ...acc, [key]: val }),
      {}
    );

    userController.updateUserPassword(<UserChangePasswordData>data);
  }

  public render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content"}}
            {{#Link to="back" className="someClass"}}
              <div class="visually-hidden">Вернуться назад</div>
              {{{Icon icon="back"}}}
            {{/Link}}
            {{{Logo}}}
          {{/Container}}
        {{/Header}}

        {{#Main}}
          {{#Title}}Изменить пароль{{/Title}}

          {{#Form}}
            {{{ControlPassword className="form__control" name="oldPassword" label="Старый пароль" value=../data.password readonly="true"}}}
            {{{ControlPassword className="form__control" name="newPassword" label="Новый пароль"}}}
            {{{ControlPassword className="form__control" name="newPasswordRepeat" label="Повторите новый пароль"}}}

            {{#Button btnName="primary" className="button_full form__submit" type="submit"}}Сохранить{{/Button}}
          {{/Form}}
        {{/Main}}
      </div>
    `;
  }
}

const withUser = withStore((state) => {
  return { ...state.user };
});
const ChangePasswordPage = withUser(ChangePasswordPageBase);
export default ChangePasswordPage;
