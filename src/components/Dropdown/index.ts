import { Block } from '../../utils/Block';
import './dropdown.scss';

type Item = {
  icon: string;
  text: string;
  onClick: () => void;
};

type DropdownProps = {
  text: string;
  menuItems: Item[];
  icon: string;
  className?: string;
};

export default class Dropdown extends Block {
  public static componentName = 'Dropdown';

  constructor(props: DropdownProps) {
    super({
      ...props,
      className: props.className ? `dropdown ${props.className}` : 'dropdown',
    });

    this.setProps({
      openMenu: () => {
        const component = <HTMLElement>this.getContent();
        const menu = <HTMLElement>component.querySelector('.dropdown__menu');
        menu.classList.toggle('dropdown__menu_active');
      },
    });

    document.addEventListener('click', (e) => {
      const component = <HTMLElement>this.getContent();
      const menu = <HTMLElement>component.querySelector('.dropdown__menu');
      const button = <HTMLElement>component.querySelector('.dropdown__button');

      if (!e.composedPath().includes(button)) {
        if (!e.composedPath().includes(menu)) {
          menu.classList.remove('dropdown__menu_active');
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      const component = <HTMLElement>this.getContent();
      const menu = <HTMLElement>component.querySelector('.dropdown__menu');

      if (e.code === 'Escape') {
        menu?.classList.remove('dropdown__menu_active');
      }
    });
  }

  render() {
    return `
      <div class="{{className}}">
        {{{Button onClick=openMenu className="dropdown__button" btnName="icon" text=text icon=icon}}}

        {{{Menu className="dropdown__menu" menuItem=menuItems}}}
      </div>
    `;
  }
}
