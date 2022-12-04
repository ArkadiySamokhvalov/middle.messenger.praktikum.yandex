import Block from '../../utils/Block';
import './logo.scss';

type LogoProps = {
  className?: string;
};

export default class Logo extends Block {
  public static componentName = 'Logo';

  constructor(props: LogoProps) {
    super(props);
  }

  render() {
    return `
      <div class='logo {{className}}'>Messenger</div>
    `;
  }
}
