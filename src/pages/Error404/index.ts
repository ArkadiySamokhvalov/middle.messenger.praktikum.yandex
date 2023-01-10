import Block from '../../utils/Block';
import image from 'url:../../../static/img/404.png';

export default class Error404Page extends Block {
  constructor() {
    super();

    this.setProps({
      image,
    });
  }

  render() {
    return `
      <div class="body">
        {{#Header}}
          {{#Container className="header__content"}}
            {{{Logo}}}
          {{/Container}}
        {{/Header}}

        {{#Main}}
          {{{Error
            name="404"
            title="Ничего не найдено."
            text="Страница, которую вы запрашиваете, не существует.
            Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке."
            alt="Мужчина в чёрном костюме с длинными черными волосами, разводит руками и смотрит по сторонам в недоумении."
            image=image
          }}}
        {{/Main}}
      </div>
    `;
  }
}
