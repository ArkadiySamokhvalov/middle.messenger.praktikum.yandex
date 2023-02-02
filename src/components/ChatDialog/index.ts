import './dialog.scss';
import { T_ChatData, T_MessageData } from '../../typings/types';
import { Block } from '../../utils/Block';
import { showModal } from '../../utils/helpers/modalHelpers';
import MessagesController from '../../controllers/MessagesController';
import { formDataToObj } from '../../utils/helpers/formDataToObj';
import ChatsController from '../../controllers/ChatsController';

type chatDialogProps = {
  chat: T_ChatData;
  messages: T_MessageData[];
  className?: string;
};

export default class ChatDialog extends Block {
  public static componentName = 'ChatDialog';

  constructor(props: chatDialogProps) {
    super({
      ...props,
      className: props.className
        ? `chat-dialog ${props.className}`
        : 'chat-dialog',
      chatMenuItems: [
        {
          icon: 'settings',
          text: 'Настройки',
          onClick: () => showModal('chat_settings'),
        },
        {
          icon: 'trash',
          text: 'Удалить чат',
          className: 'menu__item_danger',
          onClick: () => showModal('delete_chat'),
        },
        {
          icon: 'user-plus',
          text: 'Добавить пользователя',
          onClick: () => showModal('add_user_to_chat'),
        },
      ],
      showMembersList: () => showModal('add_user_to_chat'),
      submitMessage: (e: Event) => {
        const form = <HTMLFormElement>e.currentTarget;
        const data = formDataToObj(new FormData(form));
        MessagesController.sendMessage(props.chat.id, data.message);
      },
      messageValidation: {
        pattern: '',
        message: '',
      },
    });

    if (this.props.chat) {
      (async () => {
        const users = await ChatsController.getChatUsers(props.chat.id);

        this.setProps({
          users,
        });
      })();
    }
  }

  render() {
    return `
      <div class="dialog">
        {{#if chat}}

          <div class="dialog__header">
            {{{Avatar img=chat.avatar title=chat.title}}}

            <div class="row-column">
              {{{Name text=chat.title}}}
              {{{Time text="онлайн"}}}
            </div>

            {{{Dropdown text="Открыть меню" icon="more-vertical" menuItems=chatMenuItems}}}
          </div>

          <div class="dialog__body">
            {{#if messages}}
              {{{Messages messages=messages userId=userId users=users}}}
            {{else}}
              {{{Button className="dialog__add-members" btnName="primary" type="button" text="Добавить участников" onClick=showMembersList}}}
            {{/if}}
          </div>

          {{#Form name="message" className="dialog__footer" onSubmit=submitMessage}}
            {{{Control name="message" placeholder="Написать сообщение..." validation=../messageValidation}}}
            {{{Button btnName="icon" type="button" text="Выбрать эмоджи" icon="smile"}}}
            {{{Button btnName="icon" type="submit" text="Отправить сообщение" icon="send"}}}
          {{/Form}}

        {{else}}

          <div class="dialog__body">
            <div class="dialog__empty">
              Выберите, кому хотели бы написать
            </div>
          </div>

        {{/if}}
      </div>
    `;
  }
}
