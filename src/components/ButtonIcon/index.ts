import Block from '../../utils/Block';
import './buttonIcon.scss';

type ButtonIconProps = {
  text: string;
  icon: string;
  type?: string;
  className?: string;
  onClick?: () => void;
};

export default class ButtonIcon extends Block {
  public static componentName = 'ButtonIcon';
  constructor({ text, icon, type, className, onClick }: ButtonIconProps) {
    super({
      text,
      icon,
      type,
      className,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button class="button-icon {{className}}" {{#if type}} type={{"type"}} {{else}} type="button" {{/if}}>
        {{{ VisuallyHidden text=text }}}
        {{{ Icon icon=icon }}}
      </button>
    `;
  }
}
