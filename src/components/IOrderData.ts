import { IUserPayment, IUserСontacts, IBasketData, IProduct, IOrderData } from "../types";
import { IEvents } from "./base/events";

export class OrderData implements IOrderData {
    basketData: IBasketData;

    userPayment: IUserPayment = {
        paymentMethod: '',
        address: '',
    };

    userСontacts: IUserСontacts = {
        email: '',
        phone: '',
    };

    protected events: IEvents;

    constructor(basketData: IBasketData, events: IEvents) {
        this.basketData = basketData;
        this.events = events;
    }

    get basket(): IProduct[] {
        return this.basketData.items;
    }

    getOrderInfo(): object {
        return {
            items: this.basket.map(product => product.id),
            payment: this.userPayment.paymentMethod,
            address: this.userPayment.address,
            email: this.userСontacts.email,
            phone: this.userСontacts.phone,
            // price: this.basket.reduce((total, product) => total + product.price, 0)
        };
    }

}