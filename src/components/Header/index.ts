import Block from '../../utils/Block';
import './header.scss';

type HeaderProps = {
  className?: string;
  onSubmit?: () => void;
};

export default class Header extends Block {
  public static componentName = 'Header';

  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return `
      <header class="header"></header>
    `;
  }
}
