import { Block } from '../../utils/Block';
import './title.scss';

type TitleProps = {
  text: string;
  className?: string;
};

export default class Title extends Block {
  public static componentName = 'Title';

  constructor(props: TitleProps) {
    super({
      ...props,
      className: props.className ? `title ${props.className}` : 'title',
    });
  }

  render() {
    return `
      <h1 class="{{className}}">{{text}}</h1>
    `;
  }
}
