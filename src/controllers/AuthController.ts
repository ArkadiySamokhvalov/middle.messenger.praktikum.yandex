import AuthAPI from '../api/AuthAPI';
import { SigninData, SignupData } from '../typings/types';
import Store from '../utils/Store';
import Router from '../utils/Router';
import Routes from '../routes';

const store = new Store();

const enum Errors {
  'Login or password is incorrect' = 'Неверный логин или пароль',
}

export default class AuthController {
  constructor(private _api: AuthAPI, private _router: Router) {}

  private async _request(req: () => void) {
    store.set('user.isLoading', true);

    try {
      await req();
    } catch (e: any) {
      store.set('user.error', Errors[e.reason]);
    } finally {
      store.set('user.isLoading', false);
    }
  }

  public async signup(signupData: SignupData) {
    this._request(async () => {
      await this._api.signup(signupData);
      await this.fetchUser();
      store.set('user.password', signupData.password);
      this._router.go(Routes.Chat);
    });
  }

  public async signin(signinData: SigninData) {
    this._request(async () => {
      await this._api.signin(signinData);
      await this.fetchUser();
      store.set('user.password', signinData.password);
      this._router.go(Routes.Chat);
    });
  }

  public async logout() {
    this._request(async () => {
      await this._api.logout();
      this._router.go(Routes.Index);
    });
  }

  public async fetchUser() {
    const user = await this._api.getUserData();
    store.set('user.data', user);
  }
}
