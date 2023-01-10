import Block from '../../utils/Block';
import './controlFile.scss';

type ControlFileProps = {
  label?: string;
  name: string;
  value?: string;
  avatar?: string;
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
          {{#if avatar}}
            {{{Avatar className="avatar_full" img=avatar}}}
          {{else}}
            {{{Icon className="control__icon" icon="image"}}}
          {{/if}}
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
