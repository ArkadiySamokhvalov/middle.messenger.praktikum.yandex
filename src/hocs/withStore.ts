import { T_PlainObject, T_State } from '../typings/types';
import { Block } from '../utils/Block';
import store, { StoreEvents } from '../utils/Store';
import { isEqual } from '../utils/helpers/isEqual';

export function withStore<SP extends T_PlainObject>(
  mapStateToProps: (state: T_State) => SP,
) {
  return function wrap<P extends T_PlainObject>(
    Component: typeof Block<SP & P>,
  ) {
    let currentState: SP | null = null;

    return class WithStore extends Component {
      constructor(props: P) {
        const state = store.getState();
        currentState = <SP>mapStateToProps(state);

        super({ ...props, ...currentState });

        store.on(StoreEvents.Updated, () => {
          const state = store.getState();
          const propsFromState = <Partial<SP & P>>mapStateToProps(state);

          if (isEqual(<SP>currentState, propsFromState)) {
            return;
          }

          this.setProps({ ...propsFromState });
        });
      }
    };
  };
}
