import ChatsAPI from '../api/ChatsAPI';
import Store from '../utils/Store';

const store = new Store();

export default class ChatsController {
  constructor(private readonly _api: ChatsAPI) {}

  private async _request(req: () => void) {
    store.set('chats.isLoading', true);

    try {
      await req();
    } catch (e: any) {
      store.set('chats.error', e.message);
    } finally {
      store.set('chats.isLoading', false);
    }
  }

  public async createChat(title: string) {
    this._request(async () => {
      await this._api.createChat(title);
      this.fetchChats();
    });
  }

  public async deleteChat(id: number) {
    this._request(async () => {
      await this._api.deleteChat(id);
      await this.fetchChats();
    });
  }

  public addUserToChat(id: number, userId: number) {
    this._api.addUsersToChat(id, [userId]);
  }

  public getToken(id: number) {
    this._request(async () => {
      return this._api.getToken(id);
    });
  }

  public selectChat(id: number) {
    store.set('selectedChat', id);
  }

  public async fetchChats() {
    const chats = await this._api.getChats();
    store.set('chats', chats);
  }
}
