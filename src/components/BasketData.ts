import { IProduct, IBasketData } from "../types";
import { IEvents } from "./base/events";

export class BasketData implements IBasketData {
    protected _items: IProduct[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set items(items: IProduct[]) {
        this._items = items;
        // this.events.emit('cards:changed')
    }

    get items() {
        return this._items;
    }

    // Поиск товара по ID
    getProduct(productId: string) {
        return this._items.find((item) => item.id === productId); // исправлено на "id"
    }

    // Установка и получение превью
    set preview(cardId: string | null) {
        if (!cardId) {
            this._preview = null;
            return;
        }
        const selectedCard = this.getProduct(cardId);
        if (selectedCard) {
            this._preview = cardId;
            this.events.emit('card:selected');
        }
    }

    get preview() {
        return this._preview;
    }

    addProduct(product: IProduct) {
        this._items = [product, ...this._items];
        // emit 
    }

    deleteProduct(productId: string, payload: Function | null) {
        this._items = this._items.filter(item => item.id !== productId);

        if(payload) {
            payload();
        } else {
            // this.events.emit('cards:changed')
        }
    }

    // getTotalPrice(): number;
    // clear(): void;
}