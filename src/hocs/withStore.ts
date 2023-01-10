import Block from '../utils/Block';
import Store, { StoreEvents } from '../utils/Store';
import isEqual from '../utils/helpers/isEqual';

const store = new Store();

export default function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block<any>) {
    type Props = typeof Component extends typeof Block<
      infer P extends Record<string, any>
    >
      ? P
      : any;

    let currentState: Props = null;

    return class WithStore extends Component {
      constructor() {
        const state = store.getState();
        currentState = mapStateToProps(state);

        super();
        this.setProps({ ...currentState });

        store.on(StoreEvents.Updated, () => {
          const state = store.getState();
          const propsFromState = mapStateToProps(state);

          if (isEqual(currentState, propsFromState)) {
            return;
          }

          this.setProps({ ...propsFromState });
        });
      }
    };
  };
}
