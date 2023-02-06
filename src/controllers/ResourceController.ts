import { ResourcesAPI } from '../api/ResourcesAPI';

class ResourceController {
  constructor(private _api: ResourcesAPI) {}

  public getResourcePath(path: string) {
    return this._api.getResource(path);
  }
}

export default new ResourceController(new ResourcesAPI());
