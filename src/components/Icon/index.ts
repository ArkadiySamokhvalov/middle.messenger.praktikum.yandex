import Block from '../../utils/Block';
import './icon.scss';
import icons from '../../../static/icons/sprite.svg';

type IconProps = {
  icon: string;
  className?: string;
};

export default class Icon extends Block {
  public static componentName = 'Icon';

  constructor(props: IconProps) {
    super(props);
  }

  render() {
    return `
      <svg class='icon {{className}}'>
        <use href='${icons}#{{icon}}'></use>
      </svg>
    `;
  }
}
