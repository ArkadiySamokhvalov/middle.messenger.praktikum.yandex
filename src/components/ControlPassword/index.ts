import Block from '../../utils/Block';
import './controlPassword.scss';

type ControlPasswordProps = {
  label?: string;
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: string;
};

export default class ControlPassword extends Block {
  public static componentName = 'ControlPassword';

  constructor(props: ControlPasswordProps) {
    super(props);
  }

  protected componentDidMount(): void {
    const component = this.getContent();

    if (component) {
      const input = component.querySelector('.control__input');
      const icons = [...component.querySelectorAll('.control__icon')];

      icons.forEach((icon) => {
        icon.addEventListener('click', () => {
          const type =
            input?.getAttribute('type') === 'password' ? 'text' : 'password';
          input?.setAttribute('type', type);

          const useSelector = icon.querySelector('use');
          const path = useSelector?.getAttribute('href');
          const index = path?.indexOf('#');

          if (index) {
            const substr = path.substring(index + 1);
            const svg = substr === 'eye' ? 'eye-off' : 'eye';
            const newPath = path?.replace(substr, svg);
            useSelector.setAttribute('href', newPath);
          }
        });
      });
    }
  }

  render() {
    return `
      <div class='control control_password {{className}}'>
        <label class='control__label' for='{{name}}'>{{label}}</label>
        <div class='control__input-wrapper'>
          <input
            class='control__input'
            name='{{name}}'
            id='{{name}}'
            type='password'
            autocomplete

            {{#if disabled }}
              disabled
            {{/if}}

            {{#if value }}
              value="{{value}}"
            {{/if}}

            {{#if placeholder }}
              placeholder="{{placeholder}}"
            {{/if}}
          />
          {{{Icon className="control__icon" icon="eye"}}}
        </div>
        <div class="control__feedback"></div>
      </div>
    `;
  }
}
