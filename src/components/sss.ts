// interface IButtonState {
//     selected: "card" | "cash" | null;
// }

// export class PaymentMethodButtons {
//     private _buttons: NodeListOf<HTMLButtonElement>;
//     private _selected: "card" | "cash" | null = null;

//     constructor(private container: HTMLDivElement) {
//         this._buttons = container.querySelectorAll("button");
//         this.addEventListeners();
//     }

//     private addEventListeners() {
//         this._buttons.forEach(button => {
//             button.addEventListener("click", () => {
//                 this.selectPaymentMethod(button.name as "card" | "cash");
//             });
//         });
//     }

//     /**
//      * Публичный метод для выбора способа оплаты
//      */
//     public selectPaymentMethod(method: "card" | "cash") {
//         this._selected = method;
//         this.updateButtonStyles();
//         this.emitChangeEvent(method);
//     }

//     private updateButtonStyles() {
//         this._buttons.forEach(button => {
//             if (button.name === this._selected) {
//                 button.classList.add("button_alt-active");
//             } else {
//                 button.classList.remove("button_alt-active");
//             }
//         });
//     }

//     private emitChangeEvent(method: "card" | "cash") {
//         const event = new CustomEvent("paymentMethodChange", { detail: method });
//         this.container.dispatchEvent(event);
//     }

//     get selected(): "card" | "cash" | null {
//         return this._selected;
//     }
// }




// export class BasketButtonHandler {
//     private addButton: HTMLButtonElement;
//     private deleteButton: HTMLButtonElement;

//     constructor(addButton: HTMLButtonElement, deleteButton: HTMLButtonElement) {
//         this.addButton = addButton;
//         this.deleteButton = deleteButton;
//     }

//     setButtonState(isInBasket: boolean) {
//         if (isInBasket) {
//             // Если товар в корзине, кнопка "Добавить в корзину" неактивна
//             this.addButton.disabled = true;
//             // Кнопка "Удалить из корзины" активна
//             this.deleteButton.disabled = false;
//         } else {
//             // Если товара нет в корзине, кнопка "Добавить в корзину" активна
//             this.addButton.disabled = false;
//             // Кнопка "Удалить из корзины" неактивна
//             this.deleteButton.disabled = true;
//         }
//     }
// }



export class BasketButtonHandler {
    private addButton: HTMLButtonElement;
    private deleteButton: HTMLButtonElement;

    constructor(addButton: HTMLButtonElement, deleteButton: HTMLButtonElement) {
        this.addButton = addButton;
        this.deleteButton = deleteButton;

        // Проверка существования кнопок
        if (!this.addButton || !this.deleteButton) {
            throw new Error('Не удалось найти кнопки для управления корзиной.');
        }
    }

    /**
     * Устанавливает состояние кнопок в зависимости от того, находится ли товар в корзине
     * @param isInBasket - true, если товар в корзине, иначе false
     */
    setButtonState(isInBasket: boolean) {
        if (isInBasket) {
            // Если товар добавлен в корзину
            this.addButton.disabled = true;
            this.deleteButton.disabled = false;
        } else {
            // Если товар отсутствует в корзине
            this.addButton.disabled = false;
            this.deleteButton.disabled = true;
        }

        // Лог для отладки
        console.log('Состояние кнопок:');
        console.log('Кнопка добавления отключена:', this.addButton.disabled);
        console.log('Кнопка удаления отключена:', this.deleteButton.disabled);
    }
}
