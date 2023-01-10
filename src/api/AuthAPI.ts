import BaseAPI from './BaseAPi';
import { SigninData, SignupData } from '../typings/types';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signin(data: SigninData) {
    return this.http.post('/signin', { data });
  }

  public logout() {
    return this.http.post('/logout');
  }

  public signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  public getUserData() {
    return this.http.get('/user');
  }
}
