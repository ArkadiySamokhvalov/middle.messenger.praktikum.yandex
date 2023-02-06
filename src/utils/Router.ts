import { Block } from './Block';
import { Route } from './Route';

class Router {
  private static __instance: Router;
  private _currentRoute: Route | null = null;
  private _history = window.history;
  private _routes: Route[] = [];
  private readonly _rootQuery: string = 'root';

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    Router.__instance = this;
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (!route) return;

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public start() {
    this._onRoute(window.location.pathname);

    window.addEventListener('popstate', (event) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    });
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes.push(route);

    return this;
  }

  public go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this._history.back();
  }

  public forward() {
    this._history.forward();
  }
}

export default new Router();
