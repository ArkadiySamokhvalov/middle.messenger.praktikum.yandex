import { T_ChatData, T_UserDataWithRole } from '../typings/types';
import { BaseAPI } from './BaseAPI';

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChats(): Promise<T_ChatData[]> {
    return this.http.get('/');
  }

  public createChat(title: string) {
    return this.http.post('', { data: { title } });
  }

  public deleteChat(id: number): Promise<unknown> {
    return this.http.delete('', { data: { chatId: id } });
  }

  public getChatFiles(id: number) {
    return this.http.get(`/${id}/files`);
  }

  public getArchivedChats() {
    return this.http.get('/archive');
  }

  public getChatUsers(id: number): Promise<T_UserDataWithRole[]> {
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
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  public uploadChatAvatar(data: FormData) {
    return this.http.put('/avatar', { data });
  }

  public addUsersToChat(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { data: { chatId: id, users } });
  }

  public deleteUsersFromChat(id: number, users: number[]) {
    return this.http.delete('/users', { data: { chatId: id, users } });
  }
}
