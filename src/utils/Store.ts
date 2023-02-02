import { set } from './helpers/set';
import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private static __instance: Store;
  private _state: any = {};

  constructor() {
    super();

    if (Store.__instance) {
      return Store.__instance;
    }

    Store.__instance = this;
  }

  public getState() {
    return this._state;
  }

  public set(keypath: string, data: unknown) {
    set(this.getState(), keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public clearState() {
    this._state = {};
  }
}

export default new Store();
