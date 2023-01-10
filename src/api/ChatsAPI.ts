import BaseAPI from './BaseAPi';

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChats() {
    return this.http.get('/');
  }

  public createChat(title: string) {
    return this.http.post('', { data: { title } });
  }

  public deleteChat(id: number) {
    return this.http.delete('', { data: { chatId: id } });
  }

  public getChatFiles(id: number) {
    return this.http.get(`/${id}/files`);
  }

  public getArchivedChats() {
    return this.http.get('/archive');
  }

  public getChatUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }

  public getNewMessagesCount(id: number) {
    return this.http.get(`/new/${id}`);
  }

  public getCommonChat(id: number) {
    return this.http.get(`/${id}/common`);
  }

  public archiveChat(id: number) {
    return this.http.post('/archive', { data: { chatId: id } });
  }

  public unArchiveChat(id: number) {
    return this.http.post('/unarchive', { data: { chatId: id } });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post(`/token/${id}`);

    return response.token;
  }

  public uploadChatAvatar(id: number, avatar: File) {
    return this.http.put('/avatar', { data: { chatId: id, avatar } });
  }

  public addUsersToChat(id: number, users: number[]) {
    return this.http.put('/users', { data: { chatId: id, users } });
  }

  public deleteUsersFromChat(id: number, users: number[]) {
    return this.http.delete('/users', { data: { chatId: id, users } });
  }
}
