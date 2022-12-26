import Block from '../../utils/Block';
import './time.scss';

type TimeProps = {
  text?: string;
  className?: string;
};

export default class Time extends Block {
  public static componentName = 'Time';

  constructor(props: TimeProps) {
    super(props);
  }

  render() {
    return `
      <div class='time {{className}}'>{{text}}</div>
    `;
  }
}
