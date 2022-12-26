import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import UserSettingsPage from '../UserSettings';
import Validator from '../../utils/Validator';

export default class ChangePasswordPage extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToUserSettings: () => renderDOM('root', new UserSettingsPage()),
    });
  }

  protected componentDidMount(): void {
    const page = <HTMLElement>this.getContent();
    const form = <HTMLFormElement>page.querySelector('form');

    const formValidator = new Validator(form, {
      old_password: {},
      new_password: {
        pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
      new_password_repeat: {
        message: 'Пароли не совпадают.',
        sameAs: 'new_password',
      },
    });

    formValidator.init();
  }

  render() {
    return `
      <div class="body">
        <header class="header">
          <div class="container header__content">
            {{{ButtonIcon text="Вернуться назад" icon="back" onClick=redirectToUserSettings}}}
            {{{Logo}}}
          </div>
        </header>

        <main class="main">
          {{#Title}}Изменить пароль{{/Title}}

          <form class="form">
            {{{ControlPassword className="form__control" name="old_password" label="Старый пароль" value="Qwerty12345" disabled="true"}}}
            {{{ControlPassword className="form__control" name="new_password" label="Новый пароль"}}}
            {{{ControlPassword className="form__control" name="new_password_repeat" label="Повторите новый пароль"}}}

            {{#ButtonPrimary className="form__submit" type="submit"}}Сохранить{{/ButtonPrimary}}
          </form>
        </main>
      </div>
    `;
  }
}
