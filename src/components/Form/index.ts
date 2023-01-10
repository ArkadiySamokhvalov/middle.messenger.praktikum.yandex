import Block from '../../utils/Block';
import './form.scss';

type FormProps = {
  className?: string;
  name?: string;
};

export default class Form extends Block {
  public static componentName = 'Form';

  constructor(props: FormProps) {
    super(props);
    this.setProps({
      classes: props.className ? `form ${props.className}` : 'form',
    });
  }

  render() {
    return `
      <form
        {{#if name}}name="{{name}}"{{/if}}
        class="{{classes}}"
      >
      </form>
    `;
  }
}
