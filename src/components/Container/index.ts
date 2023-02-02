import { Block } from '../../utils/Block';
import './container.scss';

type ContainerProps = {
  className?: string;
};

export default class Container extends Block {
  public static componentName = 'Container';

  constructor(props: ContainerProps) {
    super({
      ...props,
      className: props.className ? `container ${props.className}` : 'container',
    });
  }

  render() {
    return `
      <div class="{{className}}"></div>
    `;
  }
}
