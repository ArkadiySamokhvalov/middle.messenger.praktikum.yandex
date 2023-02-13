import { BaseAPI } from './BaseAPI';
import { T_SigninData, T_SignupData, T_UserData } from '../typings/types';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signin(data: T_SigninData) {
    return this.http.post('/signin', { data });
  }

  public logout() {
    return this.http.post('/logout');
  }

  public signup(data: T_SignupData) {
    return this.http.post('/signup', { data });
  }

  public getUserData(): Promise<T_UserData> {
    return this.http.get('/user');
  }
}
