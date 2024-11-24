import {Component} from "./base/Component";
import {cloneTemplate, createElement, ensureElement} from "../utils/utils";
import {EventEmitter} from "./base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('formPayment:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this._button.disabled = false; // Активируем кнопку, если есть элементы
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this._button.disabled = true; // Деактивируем кнопку, если корзина пуста
        }
    }

    set total(total: number) {
        this.setText(this._total, total.toString() + ' синапсов');
    }
    
}