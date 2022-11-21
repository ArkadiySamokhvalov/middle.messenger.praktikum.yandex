function showPass() {
  const wrappers = [...document.querySelectorAll('.control__input-wrapper')];

  wrappers.forEach((wrapper) => {
    const btns = [...wrapper.querySelectorAll('.control__pass')];
    const input = wrapper.querySelector('.control__input');
    const type =
      input.getAttribute('type') === 'password' ? 'text' : 'password';

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('control__icon_hide');
        input.setAttribute('type', type);
      });
    });
  });
}
