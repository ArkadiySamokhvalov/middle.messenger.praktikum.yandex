import './modal.scss';
import { Block } from '../../utils/Block';

type ModalProps = {
  id: string;
  className?: string;
};

export default class Modal extends Block {
  public static componentName = 'Modal';

  constructor(props: ModalProps) {
    super({
      ...props,
      className: props.className ? `modal ${props.className}` : 'modal',
      events: {
        click: (e: Event) => {
          const modalContent = <HTMLElement>(
            this.getContent()?.querySelector('.modal__content')
          );
          if (!e.composedPath().includes(modalContent)) {
            this.getContent()?.classList.remove('modal_active');
          }
        },
      },
      closeModal: () => {
        this.getContent()?.classList.remove('modal_active');
      },
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.getContent()?.classList.remove('modal_active');
      }
    });
  }

  public render() {
    return `
      <div id="{{id}}" class="{{className}}">
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
            <div data-children></div>
          </div>
        </div>
      </div>
    `;
  }
}
