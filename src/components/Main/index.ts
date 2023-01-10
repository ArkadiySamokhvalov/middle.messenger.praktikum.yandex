import Block from '../../utils/Block';
import './main.scss';

type MainProps = {
  className?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
};

export default class Main extends Block {
  public static componentName = 'Main';

  constructor(props: MainProps) {
    super(props);
  }

  render() {
    return `
      <main class="main {{#if isLoading}}main_loading{{/if}}"></main>
    `;
  }
}
