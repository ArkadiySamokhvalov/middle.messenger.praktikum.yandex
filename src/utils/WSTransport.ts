import { EventBus } from './EventBus';

export enum SocketEvent {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export class WSTransport extends EventBus {
  private _socket: WebSocket | null = null;
  private _pingInterval: number | null = null;

  constructor(private readonly url: string) {
    super();
  }

  public connect() {
    this._socket = new WebSocket(this.url);
    this.subscribe(this._socket);

    return new Promise<void>((resolve, reject) => {
      this._socket?.addEventListener('open', () => {
        this._setupPingPong();
        resolve();
      });
      this._socket?.addEventListener('close', reject);
    });
  }

  private subscribe(_socket: WebSocket) {
    _socket.addEventListener('open', () => {
      this.emit(SocketEvent.Connected);
    });

    _socket.addEventListener('close', () => {
      this.emit(SocketEvent.Close);
    });

    _socket.addEventListener('error', (e) => {
      this.emit(SocketEvent.Error, e);
    });

    _socket.addEventListener('message', (e: MessageEvent<any>) => {
      const data = JSON.parse(e.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(SocketEvent.Message, data);
    });
  }

  public send(data: unknown) {
    if (!this._socket) {
      throw new Error('Websocket connection is not established yet');
    }

    this._socket.send(JSON.stringify(data));
  }

  public close() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clearInterval(this._pingInterval);
    this._socket?.close();
  }

  private _setupPingPong() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._pingInterval = setInterval(() => {
      this.send({
        type: 'ping',
      });
    }, 3000);
  }
}
