import './modal.scss';
import Block from '../../utils/Block';

type ModalProps = {
  className?: string;
  child?: Block;
};

export default class Modal extends Block {
  public static componentName = 'Modal';

  constructor(props: ModalProps) {
    super(props);

    this.setProps({
      classes: this.props.className ? `modal ${this.props.className}` : 'modal',
    });
  }

  protected componentDidMount() {
    const component = <HTMLElement>this.element;
    const modal = component.querySelector('.modal');
    const modalContent = component.querySelector('.modal__content');
    const closeButtons = modal?.querySelectorAll('.modal__close');

    document.addEventListener('click', (e) => {
      if (!e.composedPath().includes(modalContent)) {
        modal?.classList.remove('modal_active');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        modal?.classList.remove('modal_active');
      }
    });

    closeButtons?.forEach((closeButton) => {
      closeButton?.addEventListener('click', () => {
        modal?.classList.remove('modal_active');
      });
    });
  }

  public render() {
    return `
      <div class="{{classes}}">
        <div class="modal__content">
          <div class="modal__header">
            {{{Button
              onClick=closeModal
              btnName="icon"
              type="button"
              text="Закрыть окно"
              icon="close"
              className="modal__close"
            }}}
          </div>

          <div class="modal__body">
            {{{child}}}
          </div>
        </div>
      </div>
    `;
  }
}
