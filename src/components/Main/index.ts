import Block from '../../utils/Block';
import './main.scss';

type MainProps = {
  className?: string;
  onSubmit?: () => void;
};

export default class Main extends Block {
  public static componentName = 'Main';

  constructor(props: MainProps) {
    super(props);

    console.log(props);
  }

  render() {
    return `
      <main class="main"></main>
    `;
  }
}
