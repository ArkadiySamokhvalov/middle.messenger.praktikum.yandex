import { UserChangePasswordData, UserProfileData } from '../typings/types';
import BaseAPI from './BaseAPi';

export default class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public getUserById(id: number) {
    return this.http.get(`/${id}`);
  }

  public getUserByLogin(login: string) {
    return this.http.post('/search', { data: { login } });
  }

  public updateUserProfile(data: UserProfileData) {
    return this.http.put('/profile', { data });
  }

  public updateUserAvatar(data: { avatar: File }) {
    return this.http.put('/profile/avatar', { data });
  }

  public updateUserPassword(data: UserChangePasswordData) {
    return this.http.put('/password', { data });
  }
}
