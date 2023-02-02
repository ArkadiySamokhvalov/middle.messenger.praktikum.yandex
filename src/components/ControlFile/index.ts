import './controlFile.scss';
import icons from '../../../static/icons/sprite.svg';
import { Block } from '../../utils/Block';

type ControlFileProps = {
  label?: string;
  name: string;
  avatar?: string;
  className?: string;
};

export default class ControlFile extends Block {
  public static componentName = 'ControlFile';

  constructor(props: ControlFileProps) {
    super({
      ...props,
      className: props.className
        ? `control control_file ${props.className}`
        : 'control control_file',
      inputSettings: {
        name: props.name,
        accept: 'image/*',
      },
    });
  }

  render() {
    return `
      <div class="control control_file">
        <label class="control__label" for="{{name}}">
          {{{Avatar className="avatar_full" icon="${icons}#image" img=avatar}}}
        </label>

        {{{Input className="control__input" type="file" settings=inputSettings}}}
      </div>
    `;
  }
}
