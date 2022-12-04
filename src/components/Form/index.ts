import Block from '../../utils/Block';
import './form.scss';

type FormProps = {
  className?: string;
  onSubmit?: () => void;
};

export default class Form extends Block {
  public static componentName = 'Form';

  constructor({ className, onSubmit }: FormProps) {
    super({
      className,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return `
      <form class="form {{className}}"></form>
    `;
  }
}
