import { FormOrder } from "./FormOrder"; 
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IOrderState } from '../types'
import { OrderData } from "./IOrderData";
interface IPaymentForm {
    address: string;
    paymentMethod: "card" | "cash";
}

export class PaymentDetailsForm extends FormOrder<IPaymentForm> {
    constructor(container: HTMLFormElement, events: IEvents, private orderData: OrderData) {
        super(container, events);
    }

    set address(value: string) {
        const addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
        addressInput.value = value;
    }

    set paymentMethod(value: "card" | "cash") {
        this.container.querySelectorAll<HTMLButtonElement>('button[name="paymentMethod"]').forEach(button => {
            button.classList.toggle("button_selected", button.getAttribute("value") === value);
        });
    }

    render(state: Partial<IPaymentForm>) {
        if (state.address !== undefined) {
            this.address = state.address;
        }
        if (state.paymentMethod !== undefined) {
            this.paymentMethod = state.paymentMethod;
        }

        // Обновляем данные в OrderData
        if (state.address !== undefined) {
            this.orderData.setAddress(state.address);
        }
        if (state.paymentMethod !== undefined) {
            this.orderData.setPaymentMethod(state.paymentMethod);
        }

        return this.container;
    }
}
