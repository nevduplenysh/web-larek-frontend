import { FormErrors, IAppState, IDataContacts, IOrder, IDataPayment } from "../types";
import { Model } from "./base/Model";


export class AppState extends Model<IAppState> {
    order: IOrder = {
        payment: '',  
        address: '',
        email: '',
        phone: '',
        total: 0, 
        items: []
    };
    formErrors: FormErrors = {};

    clearOrder() {
        this.order.payment = '';
        this.order.address = '';
        this.order.email = '';
        this.order.phone = '';
        this.order.total = 0;
        this.order.items = [];
    }

    setOrderField(field: keyof IDataPayment, value: string){
        this.order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('payment:ready', this.order);
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