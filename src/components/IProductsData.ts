import { IProduct, IProductsData } from "../types";
import { IEvents } from "./base/events";

export class ProductsData implements IProductsData {
    protected _items: IProduct[] = []; // инициализация массива
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set items(items:IProduct[]) {
        this._items = items;
        this.events.emit("catalog:changed", { items: this.items });
    }

    get items () {
        return this._items;
    }

    // Поиск товара по ID
    getProduct(productId: string) {
        return this._items.find((item) => item.id === productId); 
    }

    getProducts() {
        return this._items;
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
}
