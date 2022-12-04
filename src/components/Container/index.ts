import Block from '../../utils/Block';
import './container.scss';

type ContainerProps = {
  className?: string;
};

export default class Container extends Block {
  public static componentName = 'Container';

  constructor(props: ContainerProps) {
    super(props);
  }

  render() {
    return `
      <div class="container {{className}}"></div>
    `;
  }
}
