import { T_MessageData } from '../typings/types';
import Store from '../utils/Store';
import { SocketEvent, WSTransport } from '../utils/WSTransport';
import ChatsController from './ChatsController';

class MessagesController {
  private _transports: Record<number, WSTransport> = {};

  constructor() {}

  public async connect(chatId: number) {
    if (this._transports[chatId]) {
      return;
    }
    const token = await ChatsController.getToken(chatId);
    const userId = Store.getState().user.data.id;
    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    await transport.connect();
    transport.on(
      SocketEvent.Message,
      this._onMessageReceived.bind(this, chatId)
    );
    transport.on(
      SocketEvent.Close,
      this._onConnectionClosed.bind(this, chatId)
    );

    this._transports[chatId] = transport;

    this.fetchOldMessages(chatId);
  }

  private _onMessageReceived(
    chatId: number,
    message: T_MessageData | T_MessageData[]
  ) {
    let messagesToAdd: T_MessageData[] = [];
    let type: string;

    if (Array.isArray(message)) {
      type = 'message';
      messagesToAdd = message.reverse();
    } else {
      type = message.type;
      messagesToAdd.push(message);
    }

    const currentMessages = (Store.getState().messages || {})[chatId] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    switch (type) {
      case 'message': {
        Store.set(`messages.${chatId}`, messagesToAdd);
        break;
      }
      case 'file': {
        break;
      }
      case 'user connected': {
        break;
      }
    }
  }

  private _onConnectionClosed(chatId: number) {
    delete this._transports[chatId];
  }

  public fetchOldMessages(chatId: number) {
    const transport = this._transports[chatId];

    if (!transport) {
      throw new Error('Connection is not established yet');
    }

    transport.send({
      type: 'get old',
      content: '0',
    });
  }

  public async sendMessage(chatId: number, content: string) {
    try {
      const transport = this._transports[chatId];

      if (!transport) {
        await this.connect(chatId);
      }

      transport.send({
        type: 'message',
        content,
      });
    } catch (e) {
      throw new Error(`Can't connect to chat`);
    }
  }

  public closeAll() {
    Object.values(this._transports).forEach((transport) => transport.close());
  }

  public close(chatId: number) {
    const transport = this._transports[chatId];

    if (!transport) {
      throw new Error('Connection is not established yet');
    }

    transport.close();
  }
}

export default new MessagesController();
