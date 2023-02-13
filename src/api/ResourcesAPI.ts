import { BaseAPI } from './BaseAPI';

export class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  public getResource(path: string) {
    return `https://ya-praktikum.tech/api/v2/resources${path}`;
  }
}
