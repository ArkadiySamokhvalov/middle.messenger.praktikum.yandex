import Block from '../../utils/Block';
import './title.scss';

type TitleProps = {
  text: string;
  className?: string;
};

export default class Title extends Block {
  public static componentName = 'Title';

  constructor(props: TitleProps) {
    super(props);
  }

  render() {
    return `
      <h1 class='title {{className}}'>{{text}}</h1>
    `;
  }
}
