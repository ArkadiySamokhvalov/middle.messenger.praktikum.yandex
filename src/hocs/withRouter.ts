import { Block } from '../utils/Block';
import Router from '../utils/Router';

export type PropsWithRouter = {
  router: typeof Router;
};

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<
    infer P extends Record<string, any>
  >
    ? P
    : any;

  return class withRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}
