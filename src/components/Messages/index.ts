import Block from '../../utils/Block';
import './messages.scss';

type MessageProps = {
  text: string;
  time: string;
  className?: string;
  img?: string;
};

export default class Message extends Block {
  public static componentName = 'Message';

  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return `
      <div class="messages__item {{className}}">
        {{#if img}}
          <picture>
            <source srcset="../../static/img/{{img}}.webp" type="image/webp">
            <img src="../../static/img/{{img}}.jpg" class="messages__item-img" alt="">
          </picture>
        {{/if}}

        <div class="messages__item-text">
          {{text}}
        </div>

        <div class="messages__bottom">
          {{{Time className="messages__item-time" text=time}}}
          {{{ Icon className="messages__item-status" icon="double-check"}}}
        </div>
      </div>
    `;
  }
}
