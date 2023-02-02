import { T_MessageData, T_UserData } from '../../typings/types';
import { Block } from '../../utils/Block';
import './messages.scss';

function parseDate(date: string) {
  const dateObj = new Date(date);
  const dateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return {
    date: dateFormatter.format(dateObj),
    time: timeFormatter.format(dateObj),
  };
}

type MessagesProps = {
  messages: T_MessageData[];
  userId: number;
  users: T_UserData[];
};

type MessagesGroupByDate = {
  [date: string]: T_MessageData &
    { time: string; ownMessage: boolean; user: T_UserData }[];
};

export default class Messages extends Block {
  public static componentName = 'Messages';

  constructor(props: MessagesProps) {
    let groupMessages = <MessagesGroupByDate>(<unknown>{});

    if (props.users && props.messages) {
      groupMessages = props.messages.reduce((acc, item) => {
        const { date, time } = parseDate(item.time);
        acc[date] = acc[date] || [];
        acc[date].push({
          ...item,
          time,
          ownMessage: props.userId === item.user_id,
          user: {
            ...props.users.filter((user) => user.id === item.user_id)[0],
          },
        });
        return acc;
      }, <MessagesGroupByDate>(<unknown>{}));
    }

    super({
      messages: groupMessages || null,
    });
  }

  render() {
    return `
      <div class="messages custom-scrollbar">
        <div class="messages__content">
          {{#if messages}}
            {{#each messages}}
              <div class="messages__data">
                <div class="messages__data-text">{{@key}}</div>
              </div>
              {{#each this}}
                {{{Message message=this}}}
              {{/each}}
            {{/each}}
          {{else}}
            <span>Нет сообщений</span>
          {{/if}}
        </div>
      </div>
    `;
  }
}
