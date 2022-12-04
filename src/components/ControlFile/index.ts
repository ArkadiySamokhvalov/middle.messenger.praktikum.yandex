import Block from '../../utils/Block';
import './controlFile.scss';

type ControlFileProps = {
  label?: string;
  name: string;
  value?: string;
};

export default class ControlFile extends Block {
  public static componentName = 'ControlFile';

  constructor(props: ControlFileProps) {
    super(props);
  }

  render() {
    return `
      <div class='control control_file'>
        <label class='control__label' for='{{name}}'>
          {{{Icon className="control__icon" icon="image"}}}
        </label>

        <input
          class='control__input'
          name='{{name}}'
          id='{{name}}'
          type='file'
          accept='image/*'
        />
      </div>
    `;
  }
}
