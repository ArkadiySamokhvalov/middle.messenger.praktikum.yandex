import { Block } from '../../utils/Block';
import './header.scss';

type HeaderProps = {
  className?: string;
};

export default class Header extends Block {
  public static componentName = 'Header';

  constructor(props: HeaderProps) {
    super({
      ...props,
      classes: props.className ? `header ${props.className}` : 'header',
    });
  }

  render() {
    return `
      <header class="{{classes}}"></header>
    `;
  }
}
