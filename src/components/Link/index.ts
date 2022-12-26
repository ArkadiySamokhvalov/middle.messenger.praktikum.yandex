import Block from '../../utils/Block';
import './link.scss';

type LinkProps = {
  text: string;
  className?: string;
  onClick?: () => void;
};

export default class Link extends Block {
  public static componentName = 'Link';

  constructor({ text, className, onClick }: LinkProps) {
    super({
      text,
      className,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <a class="link {{className}}">{{text}}</a>
    `;
  }
}
