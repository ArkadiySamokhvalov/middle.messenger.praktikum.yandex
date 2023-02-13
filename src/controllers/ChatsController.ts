import { ChatsAPI } from '../api/ChatsAPI';
import { T_UserData } from '../typings/types';
import Store from '../utils/Store';
import UsersController from './UsersController';
import MessagesController from './MessagesController';

class ChatsController {
  constructor(private readonly _api: ChatsAPI) {}

  private async _request(req: () => void) {
    try {
      await req();
    } catch (e: any) {
      Store.set('chats.error', e.reason);
    }
  }

  public async createChat(title: string) {
    this._request(async () => {
      await this._api.createChat(title);
      await this.fetchChats();
    });
  }

  public async deleteChat(id: number) {
    this._request(async () => {
      await this._api.deleteChat(id);
      MessagesController.close(id);
      await this.fetchChats();
    });
  }

  public async addUserToChat(id: number, userId: number) {
    this._request(async () => {
      await this._api.addUsersToChat(id, [userId]);
    });
  }

  public async getChatUsers(id: number) {
    const users = await this._api.getChatUsers(id);
    return users;
  }

  public async getToken(id: number) {
    const token = await this._api.getToken(id);
    return token;
  }

  public async selectChat(id: number) {
    Store.set('selectedChat.id', id);
  }

  public async fetchChats() {
    Store.set('chats.isLoading', true);

    try {
      const chats = await this._api.getChats();

      await Promise.all(
        chats.map(async (chat) => {
          return MessagesController.connect(chat.id);
        }),
      );
      Store.set('chats.data', chats);
    } catch (e: any) {
      Store.set('chats.error', e.reason);
    } finally {
      Store.set('chats.isLoading', false);
    }
  }

  public async updateChatAvatar(data: FormData) {
    this._request(async () => {
      await this._api.uploadChatAvatar(data);
      await this.fetchChats();
    });
  }

  public async createPersonalChat(login: string) {
    try {
      const user = <T_UserData>await UsersController.getUserByLogin(login);

      await this.createChat('title');
      const state = Store.getState();
      const chat = state.chats.data[0];
      await this.addUserToChat(chat.id, user.id);
      Store.set('personalChats', { user, chatId: chat.id });
    } catch (e) {
      const state = Store.getState();
      const chat = state.chats.data[0];
      this.deleteChat(chat.id);
    }
  }
}

export default new ChatsController(new ChatsAPI());
