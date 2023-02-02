import { Block } from '../../utils/Block';
import './main.scss';

type MainProps = {
  className?: string;
  isLoading?: boolean;
};

export default class Main extends Block {
  public static componentName = 'Main';

  constructor(props: MainProps) {
    let classes = 'main';
    if (props.isLoading) classes += ' main_loading';

    super({
      ...props,
      className: props.className
        ? `${classes} ${props.className}`
        : `${classes}`,
    });
  }

  render() {
    return `
      <main class="{{className}}"></main>
    `;
  }
}
