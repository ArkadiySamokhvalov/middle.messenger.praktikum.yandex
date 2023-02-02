import './chat-contacts.scss';
import { T_ChatData } from '../../typings/types';
import { Block } from '../../utils/Block';

type chatContactsProps = {
  chats: T_ChatData[];
  selectedChat: T_ChatData;
  userLogin: string;
  openModal: () => void;
  className?: string;
};

export default class ChatContacts extends Block {
  public static componentName = 'ChatContacts';

  constructor(props: chatContactsProps) {
    super({
      ...props,
      className: props.className
        ? `chat-contacts custom-scrollbar ${props.className}`
        : 'chat-contacts custom-scrollbar',
    });

    console.log('chat contacts', this.props);
  }

  render() {
    return `
      {{#if chats}}

        <div class="{{className}}">
          {{#each chats}}
            {{{Contact selectedChatId=../selectedChat.id data=this userLogin=../userLogin}}}
          {{/each}}
        </div>

      {{else}}

        <div class="{{className}} chat-contacts_empty">
          {{#Button
            onClick=openModal
            type="button"
            btnName="secondary"
            className="chat-contacts__button button_full"
          }}
            Добавить чат
            {{{Icon icon="user-plus"}}}
          {{/Button}}

          <div class="chat-contacts__text">
            Нет контактов
          </div>
        </div>

      {{/if}}
    `;
  }
}
