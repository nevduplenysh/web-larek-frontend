import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IUserData } from "../types";

interface IContactState {
    valid: boolean;
    errors: string[];
    email: string;
    phone: string;
}

export class FormContacts<T> extends Component<IContactState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected _emailInput: HTMLInputElement;
    protected _phoneInput: HTMLInputElement;

    private formState: IContactState = {
        valid: false,
        errors: [],
        email: '',
        phone: '',
    };

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this._emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this._phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this._emailInput.addEventListener('input', () => {
            this.updateState({ email: this._emailInput.value });
        });

        this._phoneInput.addEventListener('input', () => {
            this.updateState({ phone: this._phoneInput.value });
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit('contactForm:submit', this.formState);
        });
        this._submit.addEventListener('click', () => {
                        if (this.formState.valid) {
                            this.events.emit('formSucces:open');
                        }
                    });
    }

    private updateState(newState: Partial<IContactState>) {
        this.formState = { ...this.formState, ...newState };
        this.validateForm();
    }

    private validateForm() {
        const isValid = !!this.formState.email && !!this.formState.phone;
        this.valid = isValid;
        this.formState.valid = isValid;
        this.render(this.formState);
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    render(state: Partial<IContactState>) {
        const { valid, errors } = state;

        if (valid !== undefined) {
            this.valid = valid;
        }

        if (errors) {
            this.setText(this._errors, errors.join('. '));
        }

        return this.container;
    }
}





























































