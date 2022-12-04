import Block from '../../utils/Block';
import './counter.scss';

type CounterProps = {
  text?: string;
  className?: string;
};

export default class Counter extends Block {
  public static componentName = 'Counter';

  constructor(props: CounterProps) {
    super(props);
  }

  render() {
    return `
      <div class='counter {{className}}'>
        <span class="counter__text">{{text}}</span>
      </div>
    `;
  }
}
