import {
  T_UserData,
  T_UserChangePasswordData,
  T_UserProfileData,
} from '../typings/types';
import { BaseAPI } from './BaseAPI';

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public getUserById(id: number): Promise<T_UserData[]> {
    return this.http.get(`/${id}`);
  }

  public getUserByLogin(login: string): Promise<T_UserData[]> {
    return this.http.post('/search', { data: { login } });
  }

  public updateUserProfile(data: T_UserProfileData) {
    return this.http.put('/profile', { data });
  }

  public updateUserAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  public updateUserPassword(data: T_UserChangePasswordData) {
    return this.http.put('/password', { data });
  }
}
