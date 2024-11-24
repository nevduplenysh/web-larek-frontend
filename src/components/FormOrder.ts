import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IUserData } from "../types";

interface IOrderState {
    valid: boolean;
    errors: string[];
    address: string;
    paymentMethod: "card" | "cash" | null;
}

export class FormOrder<T> extends Component<IOrderState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected _addressInput: HTMLInputElement;
    protected _paymentButtons: NodeListOf<HTMLButtonElement>;

    private formState: IOrderState = {
        valid: false,
        errors: [],
        address: '',
        paymentMethod: null,
    };

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        // Находим элементы формы
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this._addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
        this._paymentButtons = this.container.querySelectorAll<HTMLButtonElement>('.order__buttons button');

        // Слушаем изменение адреса
        this._addressInput.addEventListener('input', () => {
            this.updateState({ address: this._addressInput.value });
        });

        // Слушаем выбор способа оплаты
        this._paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.updateState({ paymentMethod: button.name as "card" | "cash" });
            });
        });

        // Слушаем отправку формы
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit('paymentForm:submit', this.formState);
        });


        this._submit.addEventListener('click', () => {
            if (this.formState.valid) {
                this.events.emit('formContacts:open');
            }
        });
    }

    private updateState(newState: Partial<IOrderState>) {
        this.formState = { ...this.formState, ...newState };
        this.validateForm();
    }

    private validateForm() {
        const isValid = !!this.formState.address && !!this.formState.paymentMethod;

        this.valid = isValid; // Управляем состоянием кнопки
        this.formState.valid = isValid;

        this.render(this.formState); // Отображаем текущее состояние формы
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    render(state: Partial<IOrderState>) {
        const { valid, errors, paymentMethod } = state;

        // Обновляем валидность кнопки
        if (valid !== undefined) {
            this.valid = valid;
        }

        // Обновляем отображение ошибок
        if (errors) {
            this.setText(this._errors, errors.join('. '));
        }

        // Обновляем стиль кнопок оплаты
        if (paymentMethod !== undefined) {
            this._paymentButtons.forEach(button => {
                button.classList.toggle('button_selected', button.name === paymentMethod);
            });
        }

        return this.container;
    }
}













