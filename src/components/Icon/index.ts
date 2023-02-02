import './icon.scss';
import { Block } from '../../utils/Block';
import icons from '../../../static/icons/sprite.svg';

type IconProps = {
  icon: string;
  className?: string;
};

export default class Icon extends Block {
  public static componentName = 'Icon';

  constructor(props: IconProps) {
    super({
      ...props,
      className: props.className ? `icon ${props.className}` : 'icon',
    });
  }

  render() {
    return `
      <svg class="{{className}}">
        <use href="${icons}#{{icon}}"></use>
      </svg>
    `;
  }
}
