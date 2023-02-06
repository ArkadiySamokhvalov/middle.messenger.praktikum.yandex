import './control.scss';
import { T_Validation } from '../../typings/types';
import { Block } from '../../utils/Block';

type ControlProps = {
  name: string;
  validation?: T_Validation;
  className?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  readonly?: string;
};

export default class Control extends Block {
  public static componentName = 'Control';

  constructor(props: ControlProps) {
    super(props);

    this.setProps({
      settings: {
        name: props.name,
        validation: props.validation,
        value: props.value,
        placeholder: props.placeholder,
        readonly: props.readonly,
        feedback: this.getContent()?.querySelector('.control__feedback'),
      },
      className: props.className ? `control ${props.className}` : 'control',
    });
  }

  render() {
    return `
      <div class="{{className}}">
        {{#if label}}
          <label class="control__label" for="{{name}}">{{label}}</label>
        {{/if}}

        {{{Input className="control__input" settings=settings}}}

        <div class="control__feedback"></div>
      </div>
    `;
  }
}
