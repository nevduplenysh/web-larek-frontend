import { FormErrors, IAppState, IDataContacts, IOrder, IDataPayment } from "../types";
import { Model } from "./base/Model";
import { BasketData } from "./BasketData";


export class AppState extends Model<IAppState> {
    order: IOrder = {
        payment: '',  
        address: '',
        email: '',
        phone: '',
    };
    formErrors: FormErrors = {};

    clearOrder() {
        this.order.payment = '';
        this.order.address = '';
        this.order.email = '';
        this.order.phone = '';
    }

    setOrderField(field: keyof IDataPayment, value: string){
        this.order[field] = value;
        if (field == "payment") {
            this.events.emit('payment:choose');
        }

        if (this.validateOrder()) {
            this.events.emit('payment:ready');
        }
    }

    setContactsField(field: keyof IDataContacts, value: string){
        this.order[field] = value;

        if (this.validateContacts()) {
            this.events.emit('contacts:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};

        if (!this.order.payment) {
            errors.payment = 'Необходимо указать способ оплаты';
        }
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }

        this.formErrors = errors;
        this.events.emit('formPaymentErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContacts() {
        const errors: typeof this.formErrors = {};

        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }

        this.formErrors = errors;
        this.events.emit('formContactsErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}