import BaseAPI from './BaseAPi';

export default class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  public getResource(path: string) {
    return this.http.get(`/${path}`);
  }
}
