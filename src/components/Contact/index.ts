import './contact.scss';
import { T_ChatData } from '../../typings/types';
import ChatsController from '../../controllers/ChatsController';
import { Block } from '../../utils/Block';

type ContactProps = {
  data: T_ChatData;
  userLogin: string;
  selectedChatId: number;
};

export default class Contact extends Block {
  public static componentName = 'Contact';

  constructor(props: ContactProps) {
    super({
      ...props,
      className:
        props.selectedChatId === props.data.id
          ? 'contact contact_active'
          : 'contact',
      events: {
        click: () => ChatsController.selectChat(props.data.id),
      },
    });

    if (props.userLogin && props.data.last_message) {
      this.setProps({
        ownMessage: props.userLogin === props.data.last_message.user.login,
      });
    }
  }

  render() {
    return `
      <div class="{{className}}">
        {{{Avatar className="contact__avatar" img=data.avatar title=data.title}}}

        <div class="contact__content">
          <div class="contact__row">
            {{{Name className="contact__name" text=data.title}}}

            {{{Time className="contact__time" text=data.lastMessage.time}}}
          </div>

          <div class="contact__row">
            <p class="contact__last-message">
              {{#if data.last_message.content}}
                {{#if ownMessage}}
                  <span class="contact__own">Вы:</span>
                {{/if}}
                {{data.last_message.content}}
              {{else}}
                Нет сообщений
              {{/if}}
            </p>

            {{#if data.unread_count}}
              {{{Counter className="contact__counter" text=data.unread_count}}}
            {{/if}}
          </div>
        </div>
      </div>
    `;
  }
}
