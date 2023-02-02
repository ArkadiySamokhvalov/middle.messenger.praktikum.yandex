import { Block } from '../../utils/Block';
import './menu.scss';

type Item = {
  icon: string;
  text: string;
  onClick: () => void;
  className?: string;
};

type MenuProps = {
  menuItem?: Item[];
  className?: string;
};

export default class Menu extends Block {
  public static componentName = 'Menu';

  constructor(props: MenuProps) {
    super({
      ...props,
      className: props.className ? `menu ${props.className}` : 'menu',
    });
  }

  render() {
    return `
      <ul class="{{className}}">
        {{#each menuItem}}
          <li class="menu__item {{this.className}}">
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
