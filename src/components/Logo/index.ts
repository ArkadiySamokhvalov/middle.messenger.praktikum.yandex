import { Block } from '../../utils/Block';
import './logo.scss';

type LogoProps = {
  className?: string;
};

export default class Logo extends Block {
  public static componentName = 'Logo';

  constructor(props: LogoProps) {
    super({
      ...props,
      className: props.className ? `logo ${props.className}` : 'logo',
    });
  }

  render() {
    return `
      <div class="{{className}}">Messenger</div>
    `;
  }
}
