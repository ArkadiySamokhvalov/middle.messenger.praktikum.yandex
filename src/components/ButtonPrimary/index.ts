import Block from '../../utils/Block';
import './buttonPrimary.scss';

type ButtonPrimaryProps = {
  btnName: string;
  type: string;
  className?: string;
  onClick?: () => void;
};

export default class ButtonPrimary extends Block {
  public static componentName = 'ButtonPrimary';

  constructor({ btnName, type, className, onClick }: ButtonPrimaryProps) {
    super({
      btnName,
      type,
      className,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button class="button-primary {{className}}" type="{{type}}"></button>
    `;
  }
}
