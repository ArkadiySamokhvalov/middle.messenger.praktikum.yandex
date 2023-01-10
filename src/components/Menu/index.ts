import Block from '../../utils/Block';
import './menu.scss';

type Item = {
  icon: string;
  text: string;
  onClick: () => void;
};

type MenuProps = {
  menuItem?: Item[];
};

export default class Menu extends Block {
  public static componentName = 'Menu';

  constructor(props: MenuProps) {
    super(props);

    this.setProps({
      classes: this.props.className ? `menu ${this.props.className}` : 'menu',
    });
  }

  render() {
    return `
      <ul class="{{classes}}">
        {{#each menuItem}}
          <li class="menu__item">
            {{#Button onClick=this.onClick className="menu__button" btnName="secondary" type="button"}}
              {{{Icon icon=../this.icon}}}
              <div class="menu__text">{{../this.text}}</div>
            {{/Button}}
          </li>
        {{/each}}
      </ul>
    `;
  }
}
