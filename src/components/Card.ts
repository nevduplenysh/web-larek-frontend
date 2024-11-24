import { IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { BasketButtonHandler } from './sss';

export class Card extends Component<IProduct> {
	protected events: IEvents;
	protected addBasketButton?: HTMLButtonElement;
	protected deleteButton?: HTMLButtonElement;
    
    protected cardId: string;
    protected cardDescription?: HTMLElement;
	protected cardImage?: HTMLImageElement;
	protected cardTitle: HTMLElement;
    protected cardCategory?: HTMLElement;
    protected cardPrice: HTMLElement;
	protected _priceValue: number | null = null;
	protected _index:  number | null

    protected cardItem: HTMLElement;
	
	protected isActive: boolean;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.deleteButton = this.container.querySelector('.basket__item-delete');
        this.addBasketButton = this.container.querySelector('.button');
        this.cardDescription = this.container.querySelector('.card__text')
		this.cardImage = this.container.querySelector('.card__image');
		this.cardTitle = ensureElement<HTMLImageElement>('.card__title', container);
        this.cardCategory = this.container.querySelector('.card__category')
        this.cardPrice = ensureElement<HTMLImageElement>('.card__price', container)

        this.cardItem = this.container.querySelector('.basket__item-index')

		if (this.cardImage) {
			this.cardImage.addEventListener('click', () =>
				this.events.emit('card:select', { card: this })				
			);
		}
		

        if (this.addBasketButton) {
			this.addBasketButton.addEventListener('click', () => {
				this.events.emit('card:add', { card: this });
			})            
        }

		if (this.deleteButton) {
			this.deleteButton.addEventListener('click', () => {
				this.events.emit('card:delete', { card: this });
			})            
        }
		// ДОПИСАТЬ
	}



	render(cardData: Partial<IProduct> | undefined) { 
        const { ...otherCardData } = cardData;
        Object.assign(this, otherCardData);
		return super.render(otherCardData); 
    }



	set index(index: number) {
        if (this.cardItem) {
        	this.setText(this.cardItem, index);
    	}
	}


	set description(description: string) {
		if(this.cardDescription) {
			this.setText(this.cardDescription, description);
		}
	}

	set image(value: string) {
		if(this.cardImage) {
			this.setImage(this.cardImage, value, this.title)
		}
        
    }

	set title(title: string) {
		this.setText(this.cardTitle, title);
	}

	set category(category: string) {
		if (this.cardCategory) {
			// Удаляем все возможные классы перед добавлением нового
			const categoryClasses = [
				'card__category_other', 
				'card__category_soft', 
				'card__category_hard', 
				'card__category_additional', 
				'card__category_button'
			];
	
			this.cardCategory.classList.remove(...categoryClasses);
			
			// Устанавливаем текст
			this.cardCategory.textContent = category;      
			
			// Добавляем класс в зависимости от значения category
			const categoryClassMap: Record<string, string> = {
				'другое': 'card__category_other',
				'дополнительное': 'card__category_additional',
				'софт-скил': 'card__category_soft',
				'хард-скил': 'card__category_hard',
				'кнопка': 'card__category_button',
			};
	
			const classToAdd = categoryClassMap[category];
			if (classToAdd) {
				this.cardCategory.classList.add(classToAdd);
			}
		}
	}

	set price(price: number | null) {
		this._priceValue = price;
	
		if (this.cardPrice) {
			if (price === null) {
				this.setText(this.cardPrice, 'Бесценный'); // Выводим "Бесценный"
			} else {
				this.setText(this.cardPrice, `${price} синапсов`); // Выводим цену как есть
			}
		}
	
		if (this.addBasketButton) {
			this.addBasketButton.disabled = price === null; // Делаем кнопку неактивной, если цена null
		}
	}


	set id(id) {
		this.cardId = id;
	}
	get id() {
		return this.cardId;
	}

	deleteCard() {
		this.container.remove();
		this.container = null; // освобождение памяти
	}

}



























































// // import { BasketButtonHandler } from './BasketButtonHandler';
// // import { IProduct } from '../types';
// // import { ensureElement } from '../utils/utils';
// // import { Component } from './base/Component';
// // import { IEvents } from './base/events';

// export class Card extends Component<IProduct> {
//     protected events: IEvents;
//     protected addBasketButton?: HTMLButtonElement;
//     protected deleteButton?: HTMLButtonElement;

//     protected cardId: string;
//     protected cardDescription?: HTMLElement;
//     protected cardImage?: HTMLImageElement;
//     protected cardTitle: HTMLElement;
//     protected cardCategory?: HTMLElement;
//     protected cardPrice: HTMLElement;
//     protected _priceValue: number | null = null;
//     protected _index: number | null;

//     protected cardItem: HTMLElement;
//     protected isActive: boolean = false;

//     private basketButtonHandler?: BasketButtonHandler;

//     constructor(protected container: HTMLElement, events: IEvents) {
//         super(container);
//         this.events = events;

//         // Инициализация элементов
//         this.addBasketButton = this.container.querySelector('.button');
//         this.deleteButton = this.container.querySelector('.basket__item-delete');
//         this.cardDescription = this.container.querySelector('.card__text');
//         this.cardImage = this.container.querySelector('.card__image');
//         this.cardTitle = ensureElement<HTMLImageElement>('.card__title', container);
//         this.cardCategory = this.container.querySelector('.card__category');
//         this.cardPrice = ensureElement<HTMLImageElement>('.card__price', container);
//         this.cardItem = this.container.querySelector('.basket__item-index');

//         // Инициализация обработчика кнопок
//         if (this.addBasketButton && this.deleteButton) {
//             this.basketButtonHandler = new BasketButtonHandler(this.addBasketButton, this.deleteButton);
//         }

//         this.initializeEventListeners();
//     }

//     /**
//      * Инициализация событий для элементов карточки
//      */
//     private initializeEventListeners() {
//         // Событие клика на изображение
//         if (this.cardImage) {
//             this.cardImage.addEventListener('click', () => {
//                 this.events.emit('card:select', { card: this });
//             });
//         }

//         // Событие клика на кнопку добавления в корзину
//         if (this.addBasketButton) {
//             this.addBasketButton.addEventListener('click', () => {
//                 this.isActive = true;
//                 this.updateBasketButtonState();
//                 this.events.emit('card:add', { card: this });
//             });
//         }

//         // Событие клика на кнопку удаления из корзины
//         if (this.deleteButton) {
//             this.deleteButton.addEventListener('click', () => {
//                 this.isActive = false;
//                 this.updateBasketButtonState();
//                 this.events.emit('card:delete', { card: this });
//             });
//         }
//     }

//     /**
//      * Обновляет состояние кнопок добавления и удаления товара в корзину
//      */
//     private updateBasketButtonState() {
//         if (this.basketButtonHandler) {
//             this.basketButtonHandler.setButtonState(this.isActive);
//         }
//     }

//     /**
//      * Рендер карточки и обновление состояния кнопок
//      * @param cardData - данные карточки
//      */
//     render(cardData: Partial<IProduct> | undefined) {
//         const { ...otherCardData } = cardData;
//         Object.assign(this, otherCardData);

//         this.updateBasketButtonState(); // Обновляем состояние кнопок
//         return super.render(otherCardData);
//     }

//     // Геттеры и сеттеры для свойств карточки
//     set index(index: number) {
//         if (this.cardItem) {
//             this.setText(this.cardItem, index);
//         }
//     }

//     set description(description: string) {
//         if (this.cardDescription) {
//             this.setText(this.cardDescription, description);
//         }
//     }

//     set image(value: string) {
//         if (this.cardImage) {
//             this.setImage(this.cardImage, value, this.title);
//         }
//     }

//     set title(title: string) {
//         this.setText(this.cardTitle, title);
//     }

//     set category(category: string) {
//         if (this.cardCategory) {
//             const categoryClasses = [
//                 'card__category_other',
//                 'card__category_soft',
//                 'card__category_hard',
//                 'card__category_additional',
//                 'card__category_button',
//             ];
//             this.cardCategory.classList.remove(...categoryClasses);

//             this.cardCategory.textContent = category;

//             const categoryClassMap: Record<string, string> = {
//                 'другое': 'card__category_other',
//                 'дополнительное': 'card__category_additional',
//                 'софт-скил': 'card__category_soft',
//                 'хард-скил': 'card__category_hard',
//                 'кнопка': 'card__category_button',
//             };

//             const classToAdd = categoryClassMap[category];
//             if (classToAdd) {
//                 this.cardCategory.classList.add(classToAdd);
//             }
//         }
//     }

//     set price(price: number | null) {
//         this._priceValue = price;

//         if (this.cardPrice) {
//             if (price === null) {
//                 this.setText(this.cardPrice, 'Бесценный');
//             } else {
//                 this.setText(this.cardPrice, `${price} синапсов`);
//             }
//         }

//         if (this.addBasketButton) {
//             this.addBasketButton.disabled = price === null;
//         }
//     }

//     set id(id) {
//         this.cardId = id;
//     }

//     get id() {
//         return this.cardId;
//     }

//     /**
//      * Удаляет карточку из DOM
//      */
//     deleteCard() {
//         this.container.remove();
//         this.container = null; // Освобождаем память
//     }
// }

