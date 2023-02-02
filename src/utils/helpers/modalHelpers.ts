import Store from '../Store';

export function showModal(id: string) {
  const activeModal = document.querySelector('.modal_active');
  activeModal?.classList.remove('modal_active');

  const modal = <HTMLElement>document.getElementById(id);
  modal.classList.add('modal_active');
}

function closeModalAfterSubmit(form: HTMLFormElement) {
  const closeBtn = <HTMLButtonElement>(
    form.closest('.modal__content')?.querySelector('.modal__close')
  );
  closeBtn.click();
}

export async function submitForm(
  form: HTMLFormElement,
  error: string,
  callback: () => void
) {
  try {
    await callback();
  } catch (e: unknown) {
    Store.set('modal.error', error);
  } finally {
    form.reset();
    closeModalAfterSubmit(form);
  }
}
