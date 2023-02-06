import { T_Validation } from '../../typings/types';
import { Block } from '../../utils/Block';
import { validateInput } from '../../utils/helpers/validateFormHelpers';

type InputProps = {
  settings?: {
    name: string;
    validation: T_Validation;
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    accept?: string;
    feedback?: HTMLElement;
  };
  type?: string;
  className?: string;
};

export default class Input extends Block {
  public static componentName = 'Input';

  constructor(props: InputProps) {
    super({
      ...props.settings,
      type: props.type || 'text',
      className: props.className || '',
    });

    let events: Record<string, () => void> | Record<string, (e: Event) => void>;

    if (this.props.type === 'file') {
      events = {
        change: (e: Event) => {
          const input = <HTMLInputElement>e.currentTarget;
          const avatar = <HTMLElement>(
            input.parentElement?.querySelector('.avatar')
          );
          const icon = avatar.querySelector('.avatar__icon');
          const picture = <HTMLPictureElement>(
            avatar.querySelector('.avatar__picture')
          );
          const preview = <HTMLImageElement>(
            picture.querySelector('.avatar__img')
          );
          const file = input.files[0];
          const reader = new FileReader();

          reader.onloadend = function () {
            icon?.classList.add('avatar__icon_hide');
            picture?.classList.add('avatar__picture_show');
            preview.src = reader.result;
          };

          if (file) {
            reader.readAsDataURL(file);
          } else {
            icon?.classList.remove('avatar__icon_hide');
            picture?.classList.remove('avatar__picture_show');
            preview.src = '';
          }
        },
      };
    } else {
      events = {
        blur: () => {
          const input = <HTMLInputElement>this.getContent();

          validateInput(input);
        },
        focus: () => {
          const input = <HTMLInputElement>this.getContent();
          const feedback = <HTMLElement>(
            input.closest('.control')?.querySelector('.control__feedback')
          );
          input.classList.remove(
            'control__input_invalid',
            'control__input_valid'
          );
          feedback.textContent = '';
        },
      };
    }

    this.setProps({
      events,
    });
  }

  render() {
    return `
      <input
        id="{{name}}"
        class="{{className}}"
        name="{{name}}"
        type="{{type}}"

        {{#if accept}}
          accept="{{accept}}"
        {{else}}
          autocomplete="on"
        {{/if}}

        {{#if value}}
          value="{{value}}"
        {{/if}}

        {{#if placeholder}}
          placeholder="{{placeholder}}"
        {{/if}}

        {{#if readonly}}
          readonly="readonly"
        {{/if}}

        {{#if validation.pattern}}
          data-pattern="{{validation.pattern}}"
        {{/if}}

        {{#if validation.message}}
          data-message="{{validation.message}}"
        {{/if}}

        {{#if validation.sameAs}}
          data-same-as="{{validation.sameAs}}"
        {{/if}}
      />
    `;
  }
}
