import './error.scss';

import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import ChatPage from '../../pages/Chat';

type ErrorProps = {
  name: string;
  text: string;
  title: string;
  alt: string;
  image: string;
};

export default class Error extends Block {
  public static componentName = 'Error';

  constructor(props: ErrorProps) {
    super(props);

    this.setProps({
      redirectToChats: () => renderDOM('root', new ChatPage()),
    });
  }

  render() {
    return `
      <div class="error">
        <strong class="error__name">{{name}}</strong>
        {{#Title class="error__title"}}
          {{title}}
        {{/Title}}

        <p class="error__text">{{text}}</p>

        {{#Link className="error__back" onClick=redirectToChats}}
          {{{ Icon icon="back" }}}
          Вернуться к чатам.
        {{/Link}}

        <picture>
          <img class="error__img" src="{{image}}" alt="{{alt}}">
        </picture>
      </div>
    `;
  }
}
