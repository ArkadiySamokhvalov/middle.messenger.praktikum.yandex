import Block from '../../utils/Block';
import './button.scss';

type ButtonProps = {
  btnName: string;
  type: string;
  className?: string;
  icon?: string;
  text?: string;
  onClick?: () => void;
};

export default class Button extends Block {
  public static componentName = 'Button';

  constructor({ btnName, type, className, icon, text, onClick }: ButtonProps) {
    super({
      btnName,
      type,
      className,
      icon,
      text,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button
        class="button button__{{btnName}} {{className}}"
        type="{{type}}"
      >
        {{#if text}}
          {{{ VisuallyHidden text=text }}}
        {{/if}}

        {{#if icon}}
          {{{ Icon icon=icon }}}
        {{/if}}
      </button>
    `;
  }
}
