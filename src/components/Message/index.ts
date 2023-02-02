import { T_MessageData, T_UserData } from '../../typings/types';
import { Block } from '../../utils/Block';
import './message.scss';

type MessageProps = {
  message: T_MessageData & { ownMessage: boolean; user: T_UserData };
};

export default class Message extends Block {
  public static componentName = 'Message';

  constructor(props: MessageProps) {
    super({
      ...props,
      className: props.message.ownMessage ? `message message_own` : 'message',
      username:
        props.message.user.display_name ||
        `${props.message.user.first_name} ${props.message.user.second_name}`,
      avatar: props.message.user.avatar,
    });

    // console.log('message', this.props);
  }

  render() {
    return `
      <div class="{{className}}">
        {{{Avatar className="message__avatar" img=avatar title=username}}}

        <div class="message__content">
          {{{Name className="message__username" text=username}}}
          <div class="message__row">
            <div class="message__text">{{message.content}}</div>
            {{{Time className="message__time" text=message.time}}}
          </div>
        </div>
      </div>
    `;
  }
}
