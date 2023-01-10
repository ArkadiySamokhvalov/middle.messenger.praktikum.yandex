type Settings = {
  [inputName: string]: {
    pattern?: string | RegExp;
    message?: string;
    sameAs?: string;
  };
};

type Control = {
  input: HTMLInputElement;
  feedback: HTMLElement;
};

export default class Validator {
  private _errors: Set<string> = new Set();
  private _controls: Control[] = [];

  constructor(
    private _form: HTMLFormElement,
    private _handleSubmit: (e: Event) => void,
    private _settings: Settings
  ) {
    this._controls = this._getControls(this.form);
  }

  public init() {
    this._setHandleSubmit();
    this._setHandleBlur();
    this._setHandleFocus();
  }

  private _setHandleSubmit() {
    this.form.addEventListener('submit', (e) => this._onSubmit(e));
  }

  private _setHandleBlur() {
    this.controls.forEach(({ input, feedback }) => {
      input.addEventListener('blur', () => {
        this._validateInput(input, feedback);
        this._validateForm();
      });
    });
  }

  private _setHandleFocus() {
    this.controls.forEach(({ input, feedback }) => {
      input.addEventListener('focus', () => {
        input.classList.remove(
          'control__input_invalid',
          'control__input_valid'
        );
        feedback.classList.remove();
      });
    });
  }

  private _onSubmit(e: Event) {
    e.preventDefault();

    this.controls.forEach(({ input, feedback }) => {
      this._validateInput(input, feedback, true);
    });

    if (this._validateForm()) {
      this._handleSubmit(e);
    }
  }

  private _validateInput(
    input: HTMLInputElement,
    feedback: HTMLElement,
    notEmpty = false
  ) {
    const { name = '', value = '' } = input;
    const { pattern = '', message = '', sameAs = '' } = this.settings[name];

    const addClasses = (condition: boolean) => {
      if (condition) {
        input.classList.remove('control__input_invalid');
        input.classList.add('control__input_valid');
        feedback.textContent = '';
        this.errors.delete(name);
      } else {
        input.classList.remove('control__input_valid');
        input.classList.add('control__input_invalid');
        feedback.textContent = `${message}`;
        this.errors.add(name);
      }
    };

    if (value) {
      if (pattern) {
        addClasses(this._validate(pattern, value));
      }

      if (sameAs) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const correctVal = this.form.elements[sameAs].value;
        addClasses(value === correctVal);
      }
    } else if (notEmpty) {
      addClasses(false);
    }
  }

  private _validateForm() {
    if (this.errors.size === 0) {
      this.form.classList.remove('form_invalid');
      this.form.classList.add('form_valid');
      return true;
    } else {
      this.form.classList.remove('form_valid');
      this.form.classList.add('form_invalid');
    }
    return false;
  }

  private _validate(pattern: string | RegExp, value: string) {
    const regex = new RegExp(pattern, 'i');
    return regex.test(value);
  }

  private _getControls(form: HTMLFormElement) {
    const controls = [...form.querySelectorAll('.control:not(.control_file)')];

    return controls.reduce((acc, control) => {
      const feedback = <HTMLElement>control.querySelector('.control__feedback');
      const input = <HTMLInputElement>control.querySelector('.control__input');

      acc.push({ input, feedback });

      return acc;
    }, [] as Control[]);
  }

  set settings(v) {
    this._settings = v;
  }

  get settings() {
    return this._settings;
  }

  set form(v) {
    this._form = v;
  }

  get form() {
    return this._form;
  }

  set errors(v) {
    this._errors = v;
  }

  get errors() {
    return this._errors;
  }

  set controls(v) {
    this._controls = v;
  }

  get controls() {
    return this._controls;
  }
}
