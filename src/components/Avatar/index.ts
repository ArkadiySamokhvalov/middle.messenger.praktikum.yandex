import Block from '../../utils/Block';
import './avatar.scss';

type AvatarProps = {
  img: string;
  className?: string;
  marker?: string;
};

export default class Avatar extends Block {
  public static componentName = 'Avatar';
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return `
      <div class='avatar {{className}}'>
        <picture>
          <img class='avatar__picture' src='{{img}}' alt=""/>
        </picture>

        {{#if marker}}
          <div class='avatar__marker'></div>
        {{/if}}
      </div
    `;
  }
}
