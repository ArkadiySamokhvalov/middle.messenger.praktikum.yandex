import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import RoutePage from '..';
import image from 'url:../../../static/img/500.png';

export default class Error500Page extends Block {
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
            name="500"
            title="Ошибка обращения к сервису"
            text="Мы уже устраняем неисправность, попробуйте обновить страницу через некоторое время.
            Приносим извинения за временные неудобства."
            alt="Нарисованный бесёнок отключает провод из розетки."
            image=image
          }}}
          </main>
      </div>
    `;
  }
}
