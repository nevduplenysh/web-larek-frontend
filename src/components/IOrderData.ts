import { FormErrors, IOrderData, IUserData } from "../types";
import { IEvents } from "./base/events";


export class OrderData {
    private _order: IUserData = {
        paymentMethod: '',
        address: '',
        email: '',
        phone: ''
    };

    formErrors: FormErrors = {};
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    // Геттер для данных заказа
    get order(): IUserData {
        return this._order;
    }

    setPaymentMethod(value: string | null) {
        if (value === 'card' || value === 'cash') {
            this._order.paymentMethod = value;
            this.events.emit("order.paymentMethod:change", { paymentMethod: value });
        } else {
            console.error("Invalid payment method");
        }
    }

    setAddress(value: string) {
        this._order.address = value;
        this.events.emit("order.address:change", { address: value });
    }

    setEmail(value: string) {
        this._order.email = value;
        this.events.emit("order.email:change", { email: value });
    }

    setPhone(value: string) {
        this._order.phone = value;
        this.events.emit("order.phone:change", { phone: value });
    }

    getOrderInfo(): IUserData {
        return this._order;
    }

    // Метод для проверки валидности заказа
    validateOrder(): boolean {
        const errors: FormErrors = {};
    
        // Проверка обязательных полей
        if (!this._order.email) {
            errors.email = "Необходимо указать email";
        }
    
        if (!this._order.phone) {
            errors.phone = "Необходимо указать телефон";
        }
    
        if (!this._order.address) {
            errors.address = "Необходимо указать адрес";
        }
    
        if (!this._order.paymentMethod) {
            errors.paymentMethod = "Необходимо выбрать способ оплаты";
        }
    
        this.formErrors = errors;
        this.events.emit("formErrors:change", this.formErrors);
    
        // Возвращает true, если ошибок нет, иначе false
        return Object.keys(errors).length === 0;
    }
    
}








































































  // Метод для отправки данных на сервер
    // submitOrder() {
    //     if (this.validateOrder()) {
    //         // Если все данные валидны, отправляем на сервер
    //         fetch('/submit-order', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(this.getOrderInfo())
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Order successfully submitted:', data);
    //             this.events.emit("order.submitted", data);
    //         })
    //         .catch(error => {
    //             console.error('Error submitting order:', error);
    //             this.events.emit("order.submit.error", error);
    //         });
    //     } else {
    //         console.log('Order validation failed:', this.formErrors);
    //     }
    // }




















// export class OrderData {
//     private _order: IUserData = {
//         paymentMethod: '',
//         address: '',
//         email: '',
//         phone: ''
//     };

//     formErrors: FormErrors = {};
//     private events: IEvents;

//     constructor(events: IEvents) {
//         this.events = events;
//     }

//     get order(): IUserData {
//         return this._order;
//     }

//     setPaymentMethod(value: string) {
//         if (value === 'card' || value === 'cash') {
//             this._order.paymentMethod = value;
//             this.events.emit("order.paymentMethod:change", { paymentMethod: value });
//         } else {
//             console.error("Invalid payment method");
//         }
//     }

//     setAddress(value: string) {
//         this._order.address = value;
//         this.events.emit("order.address:change", { address: value });
//     }

//     setEmail(value: string) {
//         this._order.email = value;
//         this.events.emit("order.email:change", { email: value });
//     }

//     setPhone(value: string) {
//         this._order.phone = value;
//         this.events.emit("order.phone:change", { phone: value });
//     }

//     getOrderInfo(): IUserData {
//         return this._order;
//     }

//     validateOrder(): boolean {
//         const errors: FormErrors = {};
    
//         if (!this._order.email) {
//             errors.email = "Необходимо указать email";
//         }
    
//         if (!this._order.phone) {
//             errors.phone = "Необходимо указать телефон";
//         }
    
//         if (!this._order.address) {
//             errors.address = "Необходимо указать адрес";
//         }
    
//         if (!this._order.paymentMethod) {
//             errors.paymentMethod = "Необходимо выбрать способ оплаты";
//         }
    
//         this.formErrors = errors;
//         this.events.emit("formErrors:change", this.formErrors);
    
//         return Object.keys(errors).length === 0;
//     }

//     submitOrder() {
//         if (this.validateOrder()) {
//             fetch('/submit-order', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(this.getOrderInfo())
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Order successfully submitted:', data);
//                 this.events.emit("order.submitted", data);
//             })
//             .catch(error => {
//                 console.error('Error submitting order:', error);
//                 this.events.emit("order.submit.error", error);
//             });
//         } else {
//             console.log('Order validation failed:', this.formErrors);
//         }
//     }
// }


































// export class OrderData {
//     private email: string = "";
//     private phone: string = "";
//     private address: string = "";
//     private paymentMethod: "card" | "cash" | null = null;

//     setEmail(value: string): void {
//         this.email = value;
//     }

//     setPhone(value: string): void {
//         this.phone = value;
//     }

//     setAddress(value: string): void {
//         this.address = value;
//     }

//     setPaymentMethod(value: "card" | "cash"): void {
//         this.paymentMethod = value;
//     }

//     getOrderInfo(): IUserData {
//         return {
//             email: this.email,
//             phone: this.phone,
//             address: this.address,
//             paymentMethod: this.paymentMethod,
//         };
//     }

//     validateOrder(): boolean {
//         return (
//             !!this.email &&
//             !!this.phone &&
//             !!this.address &&
//             !!this.paymentMethod
//         );
//     }
// }



