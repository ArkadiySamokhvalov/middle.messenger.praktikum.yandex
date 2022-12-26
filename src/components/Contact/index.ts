import Block from '../../utils/Block';
import './contact.scss';

type ContactProps = {
  avatar: string;
  online?: string;
  name: string;
  time: string;
  lastMessage: string;
  counter?: string;
  className?: string;
};

export default class Contact extends Block {
  public static componentName = 'Contact';

  constructor(props: ContactProps) {
    super(props);
  }

  render() {
    return `
      <div class='contact row-between {{className}}'>
        {{{ Avatar className='contact__avatar' img=avatar marker=online }}}

        <div class='contact__content row-column'>
          <div class='row-between'>
            {{{Name className='contact__name' text=name}}}

            {{{Time className='contact__time' text=time}}}
          </div>

          <div class='row-between'>
            <p class='contact__last-message'>{{lastMessage}}</p>

            {{#if counter}}
              {{{Counter className='contact__counter' text=counter}}}
            {{/if}}
          </div>
        </div>
      </div>
    `;
  }
}
