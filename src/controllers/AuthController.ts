import { AuthAPI } from '../api/AuthAPI';
import { T_SigninData, T_SignupData } from '../typings/types';
import Store from '../utils/Store';
import Router from '../utils/Router';
import { Routes } from '../routes';
import MessagesController from './MessagesController';

const enum Errors {
  'Login or password is incorrect' = 'Неверный логин или пароль',
  'Cookie is not valid' = 'Файл cookie недействителен',
}

class AuthController {
  constructor(private _api: AuthAPI, private _router: typeof Router) {}

  private async _request(req: () => void) {
    Store.set('user.isLoading', true);
    Store.set('user.error', null);

    try {
      await req();
    } catch (e: unknown) {
      Store.set('user.error', Errors[e.reason]);
    } finally {
      Store.set('user.isLoading', false);
    }
  }

  public async signup(signupData: T_SignupData) {
    this._request(async () => {
      await this._api.signup(signupData);
      this.fetchUser();
      this._router.go(Routes.Chat);
    });
  }

  public async signin(signinData: T_SigninData) {
    this._request(async () => {
      await this._api.signin(signinData);
      this.fetchUser();
      this._router.go(Routes.Chat);
    });
  }

  public async logout() {
    this._request(async () => {
      await this._api.logout();
      MessagesController.closeAll();
      Store.clearState();
      this._router.go(Routes.Index);
    });
  }

  public async fetchUser() {
    const user = await this._api.getUserData();
    Store.set('user.data', {
      ...user,
      display_name:
        user.display_name || `${user.first_name} ${user.second_name}`,
    });
  }
}

export default new AuthController(new AuthAPI(), Router);
