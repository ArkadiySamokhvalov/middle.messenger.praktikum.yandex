import Block from '../../utils/Block';
import './name.scss';

type NameProps = {
  text?: string;
  className?: string;
};

export default class Name extends Block {
  public static componentName = 'Name';

  constructor(props: NameProps) {
    super(props);
  }

  render() {
    return `
      <div class='name {{className}}'>{{text}}</div>
    `;
  }
}
