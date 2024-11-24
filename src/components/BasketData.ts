import { IProduct, IBasketData } from "../types";
import { IEvents } from "./base/events";


export class BasketData implements IBasketData {
    protected _items: IProduct[] = []; // Инициализация массива
    protected _preview: string | null = null;
    protected _currentCardIndex: number | null = null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    // Установить товары в корзину
    set items(items: IProduct[]) {
        this._items = items;
        this.events.emit('basket:changed', { items: this._items });
    }

    // Получить товары в корзине
    get items() {
        return this._items;
    }

    // Поиск товара по ID
    getProduct(productId: string): IProduct | undefined {
        return this._items.find((item) => item.id === productId);
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
            this.events.emit('card:selected', { card: selectedCard });
        }
    }

    get preview() {
        return this._preview;
    }

    ///////////////////////////////////////////////////
    get count(): number {
        return this._items.length;
    }

    // Добавить товар в корзину
    addProduct(product: IProduct) {
        // Проверка, если товар уже есть в корзине
        const existingProduct = this._items.find(item => item.id === product.id);
    
        if (!existingProduct) {
            // Если товара нет в корзине, добавляем его
            this._items.unshift(product);
            this.events.emit('basket:changed', { items: this._items });
        } else {
            // Если товар уже есть в корзине, выводим предупреждение
            console.warn(`Товар с ID ${product.id} уже в корзине.`);
        }
    }

    // Удалить товар из корзины
    deleteProduct(productId: string, payload?: () => void) {
        const initialLength = this._items.length;
        this._items = this._items.filter((item) => item.id !== productId);

        if (this._items.length < initialLength) {
            this.events.emit('basket:changed', { items: this._items });
            if (payload) payload();
        } else {
            console.warn(`Товар с ID ${productId} не найден в корзине.`);
            // Можно выбросить исключение, если нужно строго обработать эту ошибку
            // throw new Error(`Товар с ID ${productId} не найден в корзине.`);
        }
    }

    // Получить общую стоимость товаров в корзине
    getTotalPrice(): number {
        return this._items.reduce((total, item) => {
            return total + (item.price || 0); // Используем (item.price || 0) для безопасности
        }, 0);
    }

    get currentCardIndex() {
        return this._currentCardIndex;
    }

    // Очистить корзину
    clear() {
        this._items = [];
        this.events.emit('basket:cleared');
    }
    
}