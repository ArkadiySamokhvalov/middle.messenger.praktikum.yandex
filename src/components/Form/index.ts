import { Block } from '../../utils/Block';
import {
  getControls,
  validateForm,
  validateInput,
} from '../../utils/helpers/validateFormHelpers';
import './form.scss';

type FormProps = {
  name: string;
  className?: string;
  onSubmit: (e: Event) => void;
};

export default class Form extends Block {
  public static componentName = 'Form';
  private errors: Set<string> = new Set();

  constructor(props: FormProps) {
    super({
      ...props,
      className: props.className ? `form ${props.className}` : 'form',
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = <HTMLFormElement>e.currentTarget;
          const controls = getControls(form);

          controls.forEach(({ input }) => {
            const error = validateInput(input, true);
            if (error) {
              this.errors.add(input.name);
            } else {
              this.errors.delete(input.name);
            }
          });

          if (validateForm(form, this.errors)) {
            props.onSubmit(e);
          }
        },
      },
    });
  }

  render() {
    return `
      <form name="{{name}}" class="{{className}}"></form>
    `;
  }
}
