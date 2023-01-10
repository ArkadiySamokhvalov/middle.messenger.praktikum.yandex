import Block from '../../utils/Block';
import image from 'url:../../../static/img/500.png';

export default class Error500Page extends Block {
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
            name="500"
            title="Ошибка обращения к сервису"
            text="Мы уже устраняем неисправность, попробуйте обновить страницу через некоторое время.
            Приносим извинения за временные неудобства."
            alt="Нарисованный бесёнок отключает провод из розетки."
            image=image
          }}}
        {{/Main}}
      </div>
    `;
  }
}
