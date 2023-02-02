import { Block } from '../../utils/Block';
import './counter.scss';

type CounterProps = {
  text?: string;
  className?: string;
};

export default class Counter extends Block {
  public static componentName = 'Counter';

  constructor(props: CounterProps) {
    super(props);

    this.setProps({
      ...props,
      className: props.className ? `counter ${props.className}` : 'counter',
    });
  }

  render() {
    return `
      <div class="{{className}}">
        <span class="counter__text">{{text}}</span>
      </div>
    `;
  }
}
