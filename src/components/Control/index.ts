import Block from '../../utils/Block';
import './control.scss';

type ControlProps = {
  label?: string;
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
};

export default class Control extends Block {
  public static componentName = 'Control';

  constructor(props: ControlProps) {
    super(props);
  }

  render() {
    return `
      <div class='control {{className}}'>
        {{#if label}}
          <label class='control__label' for='{{name}}'>{{label}}</label>
        {{/if}}

        <input
          class='control__input'
          name="{{name}}"
          id="{{name}}"
          type='text'
          autocomplete="on"

          {{#if value }}
            value="{{value}}"
          {{/if}}

          {{#if placeholder }}
            placeholder="{{placeholder}}"
          {{/if}}
        />

        <div class="control__feedback"></div>
      </div>
    `;
  }
}
