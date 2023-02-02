import './avatar.scss';
import ResourceController from '../../controllers/ResourceController';
import { Block } from '../../utils/Block';

type AvatarProps = {
  img: string;
  title: string;
  className?: string;
  icon?: string;
};

export default class Avatar extends Block {
  public static componentName = 'Avatar';
  constructor(props: AvatarProps) {
    super({
      ...props,
      avatarPath: props.img
        ? ResourceController.getResourcePath(props.img)
        : null,
      className: props.className ? `avatar ${props.className}` : 'avatar',
      initials: props.title
        ? props.title
            .split(' ')
            .slice(0, 3)
            .reduce((acc, word) => `${acc}${word[0].toUpperCase()}`, '')
        : null,
    });
  }

  render() {
    return `
      {{#if avatarPath}}
        <div class="{{className}}">
          <picture class="avatar__picture">
            <img class="avatar__img" src="{{avatarPath}}" alt=""/>
          </picture>
        </div
      {{else}}
          {{#if icon}}
            <div class="{{className}} avatar_centered">
              {{{Icon className="avatar__icon" icon="image"}}}
              <picture class="avatar__picture">
                <img class="avatar__img" src="" alt=""/>
              </picture>
            </div>
          {{else}}
            <div class="{{className}} avatar_empty">
              {{initials}}
            </div>
          {{/if}}
      {{/if}}

    `;
  }
}
