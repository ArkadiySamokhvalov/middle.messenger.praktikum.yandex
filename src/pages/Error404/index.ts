import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import RoutePage from '..';
import image from 'url:../../../static/img/404.png';

export default class Error404Page extends Block {
  constructor() {
    super();

    this.setProps({
      redirectToRoutePage: () => renderDOM('root', new RoutePage()),
      image,
    });
  }

  render() {
    return `
      <div class="body">
        <header class="header">
          <div class="container header__content">
            {{{ButtonIcon text="Вернуться назад" icon="back" onClick=redirectToRoutePage}}}
            {{{Logo}}}
          </div>
        </header>

        <main class="main">
          {{{Error
            name="404"
            title="Ничего не найдено."
            text="Страница, которую вы запрашиваете, не существует.
            Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке."
            alt="Мужчина в чёрном костюме с длинными черными волосами, разводит руками и смотрит по сторонам в недоумении."
            image=image
          }}}
        </main>
      </div>
    `;
  }
}
