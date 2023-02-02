import './link.scss';
import { Block } from '../../utils/Block';
import { withRouter } from '../../hocs/withRouter';

type LinkProps = {
  to: string;
  text?: string;
  className?: string;
};

class BaseLink extends Block {
  public static componentName = 'Link';
  constructor(props: LinkProps) {
    super({
      ...props,
      className: props.className ? `link ${props.className}` : 'link',
      events: {
        click: () => this._navigate(),
      },
    });
  }

  private _navigate() {
    if (this.props.to === 'back') {
      this.props.router.back();
    } else {
      this.props.router.go(this.props.to);
    }
  }

  public render() {
    return `
      <a class="{{className}}">
      {{text}}
      </a>
    `;
  }
}

const Link = withRouter(BaseLink);
export default Link;
