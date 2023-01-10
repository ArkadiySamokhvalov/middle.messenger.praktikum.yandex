import Block from '../../utils/Block';
import './dropdown.scss';

type Item = {
  icon: string;
  text: string;
  onClick: () => void;
};

type DropdownProps = {
  text: string;
  menuItems: Item[];
  icon?: string;
  className?: string;
};

export default class Dropdown extends Block {
  public static componentName = 'Dropdown';

  constructor(props: DropdownProps) {
    super(props);

    console.log(props);
  }

  protected componentDidMount(): void {
    const component = this.element;
    const button = component?.querySelector('.dropdown__button');
    const menu = component?.querySelector('.dropdown__menu');

    button?.addEventListener('click', () => {
      menu?.classList.toggle('dropdown__menu_active');
    });

    document.addEventListener('click', (e) => {
      if (!e.composedPath().includes(button)) {
        if (!e.composedPath().includes(menu)) {
          menu?.classList.remove('dropdown__menu_active');
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        menu?.classList.remove('dropdown__menu_active');
      }
    });
  }

  render() {
    return `
      <div class='dropdown {{className}}'>
        {{#if icon}}
          {{{Button className="dropdown__button" btnName="icon" text=text icon=icon}}}
        {{else}}
          {{#Button}}{{text}}{{/Button}}
        {{/if}}

        {{{Menu className="dropdown__menu" menuItem=menuItems}}}
      </div>
    `;
  }
}
