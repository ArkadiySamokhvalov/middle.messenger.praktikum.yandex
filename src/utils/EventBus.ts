export default class EventBus<E extends { [Ev: string]: unknown[] }> {
  private readonly listeners: {
    [K in keyof E]?: Array<(...args: E[K]) => void>;
  } = {};

  public on<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  public off<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event as string}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback
    );
  }

  public emit<K extends keyof E>(event: K, ...args: E[K]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]?.forEach((listener) => listener(...args));
  }
}
