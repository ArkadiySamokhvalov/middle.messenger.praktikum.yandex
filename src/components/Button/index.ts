import { Block } from '../../utils/Block';
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

  constructor(props: ButtonProps) {
    super({
      ...props,
      className: props.className
        ? `button button__${props.btnName} ${props.className}`
        : `button button__${props.btnName}`,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return `
      <button class="{{className}}" type="{{type}}">
        {{#if icon}}
          {{{ Icon icon=icon }}}
          {{#if text}}
            {{{ VisuallyHidden text=text }}}
          {{/if}}
        {{else}}
          {{text}}
        {{/if}}
      </button>
    `;
  }
}
