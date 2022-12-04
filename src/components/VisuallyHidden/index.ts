import Block from '../../utils/Block';
import './visuallyHidden.scss';

type VisuallyHiddenProps = {
  text: string;
};

export default class VisuallyHidden extends Block {
  public static componentName = 'VisuallyHidden';

  constructor(props: VisuallyHiddenProps) {
    super(props);
  }

  render() {
    return `
      <div class="visually-hidden">{{text}}</div>
    `;
  }
}
