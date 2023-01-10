import UsersAPI from '../api/UsersAPI';
import ResourcesAPI from '../api/ResourcesAPI';
import Store from '../utils/Store';
import { UserProfileData, UserChangePasswordData } from '../typings/types';

const store = new Store();
const resources = new ResourcesAPI();

export default class UsersController {
  constructor(private _api: UsersAPI) {}

  private async _request(req: () => void) {
    store.set('user.isLoading', true);

    try {
      await req();
    } catch (e: any) {
      store.set('user.error', e.reason);
    } finally {
      store.set('user.isLoading', false);
    }
  }

  public getUserAvatar(path: string) {
    this._request(async () => {
      const response = await resources.getResource(path);
      console.log(response);
    });
  }

  public updateUserAvatar(data: { avatar: File }) {
    this._request(async () => {
      const user = await this._api.updateUserAvatar(data);
      store.set('user.data', user);
    });
  }

  public updateUserPassword(data: UserChangePasswordData) {
    this._request(async () => {
      await this._api.updateUserPassword(data);
    });
  }

  public updateUserProfile(data: UserProfileData) {
    this._request(async () => {
      const req = await this._api.updateUserProfile(data);
      console.log(req);
    });
  }
}
