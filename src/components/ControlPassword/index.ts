import './controlPassword.scss';
import { T_Validation } from '../../typings/types';
import Control from '../Control';

type ControlProps = {
  name: string;
  validation: T_Validation;
  className?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  readonly?: string;
};

export default class ControlPassword extends Control {
  public static componentName = 'ControlPassword';

  constructor(props: ControlProps) {
    super({
      ...props,
      className: props.className
        ? `control control_password ${props.className}`
        : 'control control_password',
    });

    this.setProps({
      showPass: (e: Event) => {
        const button = <HTMLButtonElement>e?.currentTarget;
        const input = <HTMLInputElement>button.nextElementSibling;

        const type =
          input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        const useSelector = <SVGUseElement>button.querySelector('use');
        const path = <string>useSelector.getAttribute('href');
        const index = path.indexOf('#');
        const substr = path.substring(index + 1);
        const svg = substr === 'eye' ? 'eye-off' : 'eye';
        const newPath = path.replace(substr, svg);
        useSelector.setAttribute('href', newPath);
      },
    });
  }

  render() {
    return `
      <div class="{{className}}">
        {{#if label}}
          <label class="control__label" for="{{name}}">{{label}}</label>
        {{/if}}

        <div class="control__input-wrapper">
          {{{Button onClick=showPass className="control__icon" btnName="icon" type="button" text="Показать пароль" icon="eye"}}}
          {{{Input type="password" className="control__input" settings=settings}}}
        </div>

        <div class="control__feedback"></div>
      </div>
    `;
  }
}
