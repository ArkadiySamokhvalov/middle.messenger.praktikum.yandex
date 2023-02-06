import { UsersAPI } from '../api/UsersAPI';
import Store from '../utils/Store';
import {
  T_UserData,
  T_UserProfileData,
  T_UserChangePasswordData,
} from '../typings/types';

class UsersController {
  constructor(private _api: UsersAPI) {}

  private async _request(req: () => void) {
    Store.set('user.isLoading', true);

    try {
      await req();
    } catch (e: any) {
      Store.set('user.error', e.reason);
    } finally {
      Store.set('user.isLoading', false);
    }
  }

  public async updateUserAvatar(data: FormData) {
    this._request(async () => {
      const user = await this._api.updateUserAvatar(data);
      Store.set('user.data', user);
    });
  }

  public async updateUserPassword(data: T_UserChangePasswordData) {
    this._request(async () => {
      await this._api.updateUserPassword(data);
    });
  }

  public async updateUserProfile(data: T_UserProfileData) {
    this._request(async () => {
      const user = await this._api.updateUserProfile(data);
      Store.set('user.data', user);
    });
  }

  public async getUserByLogin(login: string): Promise<T_UserData> {
    const user = <T_UserData[]>await this._api.getUserByLogin(login);
    return {
      ...user[0],
      display_name:
        user[0].display_name || `${user[0].first_name} ${user[0].second_name}`,
    };
  }
}

export default new UsersController(new UsersAPI());
