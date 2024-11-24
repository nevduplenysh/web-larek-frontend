import { FormContacts } from "./FormContacts";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IOrderState } from "../types";
import { OrderData } from "./IOrderData";

interface IContactForm {
    email: string;
    phone: string;
}

export class ContactDetailsForm extends FormContacts<IContactForm> {
    constructor(container: HTMLFormElement, events: IEvents, private orderData: OrderData) {
        super(container, events);
    }

    set phone(value: string) {
        const phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
        phoneInput.value = value;
    }

    set email(value: string) {
        const emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        emailInput.value = value;
    }

    render(state: Partial<IContactForm>) {
        if (state.phone !== undefined) {
            this.phone = state.phone;
        }
        if (state.email !== undefined) {
            this.email = state.email;
        }

        // Обновляем данные в OrderData
        if (state.email !== undefined) {
            this.orderData.setEmail(state.email);
        }
        if (state.phone !== undefined) {
            this.orderData.setPhone(state.phone);
        }

        return this.container;
    }
}
