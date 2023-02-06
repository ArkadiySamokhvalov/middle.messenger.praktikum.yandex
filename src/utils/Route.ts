import { Block } from './Block';
import { renderDOM } from './renderDOM';

export class Route {
  private _block: Block | null = null;

  constructor(
    private _pathname: string,
    private readonly _blockClass: typeof Block,
    private readonly _props: Record<string, unknown>
  ) {}

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block = null;
    }
  }

  public match(pathname: string) {
    return pathname === this._pathname;
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._props.rootQuery as string, this._block);
      return;
    }
  }
}
