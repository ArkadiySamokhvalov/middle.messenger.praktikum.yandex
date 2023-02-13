type Control = {
  input: HTMLInputElement;
  feedback: HTMLElement;
};

export function getControls(form: HTMLFormElement) {
  const controls = [...form.querySelectorAll('.control:not(.control_file)')];

  return controls.reduce((acc, control) => {
    const feedback = <HTMLElement>control.querySelector('.control__feedback');
    const input = <HTMLInputElement>control.querySelector('.control__input');

    acc.push({ input, feedback });

    return acc;
  }, [] as Control[]);
}

export function validateForm(form: HTMLFormElement, errors: Set<string>) {
  if (errors.size === 0) {
    form.classList.remove('form_invalid');
    form.classList.add('form_valid');
    return true;
  } else {
    form.classList.remove('form_valid');
    form.classList.add('form_invalid');
  }
  return false;
}

export function addClasses(
  condition: boolean,
  input: HTMLInputElement,
  feedback: HTMLElement,
  message: string,
) {
  if (condition) {
    input.classList.remove('control__input_invalid');
    input.classList.add('control__input_valid');
    feedback.classList.remove('control__feedback_show');
    feedback.textContent = '';
  } else {
    input.classList.remove('control__input_valid');
    input.classList.add('control__input_invalid');
    feedback.classList.add('control__feedback_show');
    feedback.textContent = message;
  }
}

export function validate(pattern: string | RegExp, value: string) {
  const regex = new RegExp(pattern, 'i');
  return regex.test(value);
}

export function validateInput(input: HTMLInputElement, notEmpty = false) {
  const form = <HTMLFormElement>input.closest('form');
  const feedback = <HTMLElement>(
    input.closest('.control')?.querySelector('.control__feedback')
  );
  const { value = null } = input;
  const { pattern = null, sameAs = null } = input.dataset;
  let { message = null } = input.dataset;
  let error = false;

  const addClasses = (condition: boolean) => {
    if (condition) {
      input.classList.remove('control__input_invalid');
      input.classList.add('control__input_valid');
      feedback.classList.remove('control__feedback_show');
      feedback.textContent = '';
      error = false;
    } else {
      input.classList.remove('control__input_valid');
      input.classList.add('control__input_invalid');
      feedback.classList.add('control__feedback_show');
      feedback.textContent = `${message}`;
      error = true;
    }
  };

  if (value) {
    if (pattern) {
      addClasses(validate(pattern, value));
    }
    if (sameAs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const correctVal = <string>form.elements[sameAs].value;
      addClasses(value === correctVal);
    }
  } else if (notEmpty) {
    message = 'Заполните поле.';
    addClasses(false);
  }

  return error;
}
