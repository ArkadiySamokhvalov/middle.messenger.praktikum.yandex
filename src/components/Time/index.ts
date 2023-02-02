import { Block } from '../../utils/Block';
import './time.scss';

type TimeProps = {
  text?: string;
  className?: string;
};

export default class Time extends Block {
  public static componentName = 'Time';

  constructor(props: TimeProps) {
    super({
      ...props,
      className: props.className ? `time ${props.className}` : 'time',
    });
  }

  render() {
    return `
      <div class="{{className}}">{{text}}</div>
    `;
  }
}
