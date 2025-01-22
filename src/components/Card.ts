// import { IProduct } from '../types';
// import { CDN_URL } from '../utils/constants';
// import { cloneTemplate, ensureElement } from '../utils/utils';
// import { Component } from './base/Component';
// import { IEvents } from './base/events';


// export class Card extends Component<IProduct> {
// 	protected events: IEvents;
// 	protected _addBasketButton?: HTMLButtonElement;
// 	protected deleteButton?: HTMLButtonElement;
    
//     protected _id: string;
//     protected _description?: HTMLElement;
// 	protected _image?: HTMLImageElement;
// 	protected _title: HTMLElement;
//     protected _category?: HTMLElement;
//     protected _price: HTMLElement;
// 	// protected _priceValue: number | null;

//     protected cardItem: HTMLElement;

// 	constructor(protected container: HTMLElement, events: IEvents) {
// 		super(container);
// 		this.events = events;
// 		this.deleteButton = this.container.querySelector('.basket__item-delete');
//         this._addBasketButton = this.container.querySelector('.card__button');
//         this._description = this.container.querySelector('.card__text')
// 		this._image = this.container.querySelector('.card__image');
// 		this._title = ensureElement<HTMLImageElement>('.card__title', container);
//         this._category = this.container.querySelector('.card__category')
//         this._price = ensureElement<HTMLImageElement>('.card__price', container)

//         this.cardItem = this.container.querySelector('.basket__item-index')

// 		if (this._image) { 
// 			this._image.addEventListener('click', () => 
// 				this.events.emit('card:select', { card: this })				 
// 			); 
// 		} 

// 		this.container.addEventListener('click', (event) => {
// 			if (event.target === this.container) {
// 				this.events.emit('card:select', { card: this });
// 			}
// 		});
		
//         if (this._addBasketButton) {		
// 			this._addBasketButton.addEventListener('click', () => {
// 				this.events.emit('card:add', { card: this });
// 			})        
//         }

// 		if (this.deleteButton) {
// 			this.deleteButton.addEventListener('click', () => {
// 			})            
//         }
// 	}

// 	render(cardData: Partial<IProduct> | undefined) { 
//         const { ...otherCardData } = cardData;
//         Object.assign(this, otherCardData);    	
// 		return super.render(otherCardData); 
//     }

// 	set addBasketButton(h:boolean) {
// 		this.setDisabled(this._addBasketButton, h)
// 	}

// 	set index(index: number) {
//         if (this.cardItem) {
//         	this.setText(this.cardItem, index);
//     	}
// 	}

// 	set description(description: string) {
// 		if(this._description) {
// 			this.setText(this._description, description);
// 		}
// 	}

// 	set image(value: string) {
// 		if(this._image) {
// 			this.setImage(this._image, value, this.title)
// 		}  
//     }

// 	set title(title: string) {
// 		this.setText(this._title, title);
// 	}

// 	set category(category: string) {
// 		if (this._category) {
// 			const categoryClasses = [
// 				'card__category_other', 
// 				'card__category_soft', 
// 				'card__category_hard', 
// 				'card__category_additional', 
// 				'card__category_button'
// 			];
	
// 			this._category.classList.remove(...categoryClasses);

// 			this._category.textContent = category;      
			
// 			const categoryClassMap: Record<string, string> = {
// 				'другое': 'card__category_other',
// 				'дополнительное': 'card__category_additional',
// 				'софт-скил': 'card__category_soft',
// 				'хард-скил': 'card__category_hard',
// 				'кнопка': 'card__category_button',
// 			};
	
// 			const classToAdd = categoryClassMap[category];
// 			if (classToAdd) {
// 				this._category.classList.add(classToAdd);
// 			}
// 		}
// 	}

// 	// set price(price: number | null) {
// 	// 	this._priceValue = price;
	
// 	// 	if (this._price) {
// 	// 		if (price === null) {
// 	// 			this.setText(this._price, 'Бесценный'); // Выводим "Бесценный"
				
// 	// 		} else {
// 	// 			this.setText(this._price, `${price} синапсов`); // Выводим цену как есть
// 	// 		}
// 	// 	}
// 	// 	if (this.addBasketButton) {
// 	// 		this.addBasketButton.disabled = price === null; // Делаем кнопку неактивной, если цена null
// 	// 	}
// 	// }

// 	set price(price: number | null) {
// 		if (this._price) {
// 			if (price === null) {
// 				this.setText(this._price, 'Бесценный');
// 			} else {
// 				this.setText(this._price, `${price} синапсов`);
// 			}
// 		}
// 		if (this._addBasketButton) {
// 			this._addBasketButton.disabled = price === null;
// 		}
// 	}
	
// 	set id(id) {
// 		this._id = id;
// 	}

// 	get id() {
// 		return this._id;
// 	}

// 	deleteCard() {
// 		this.container.remove();
// 		this.container = null; // освобождение памяти
// 	}
// }


import { IProduct } from '../types'; 
import { CDN_URL } from '../utils/constants'; 
import { cloneTemplate, ensureElement } from '../utils/utils'; 
import { Component } from './base/Component'; 
import { IEvents } from './base/events'; 
 
 
export class Card extends Component<IProduct> { 
	protected events: IEvents; 
	protected addBasketButton?: HTMLButtonElement; 
	protected deleteButton?: HTMLButtonElement; 
	protected _bb?: HTMLButtonElement

     
    protected _id: string; 
    protected _description?: HTMLElement; 
	protected _image?: HTMLImageElement; 
	protected _title: HTMLElement; 
    protected _category?: HTMLElement; 
    protected _price: HTMLElement;  
    protected cardItem: HTMLElement; 
 
	constructor(protected container: HTMLElement, events: IEvents) { 
		super(container); 
		this.events = events; 
		this.deleteButton = this.container.querySelector('.basket__item-delete'); 
        this.addBasketButton = this.container.querySelector('.button'); 
        this._description = this.container.querySelector('.card__text') 
		this._image = this.container.querySelector('.card__image'); 
		this._title = ensureElement<HTMLImageElement>('.card__title', container); 
        this._category = this.container.querySelector('.card__category') 
        this._price = ensureElement<HTMLImageElement>('.card__price', container) 

 
        this.cardItem = this.container.querySelector('.basket__item-index') 

		this._bb = this.container.querySelector('.card__button')
 
		if (this._image) {  
			this._image.addEventListener('click', () =>  
				this.events.emit('card:select', { card: this })				  
			);  
		}  
 
		this.container.addEventListener('click', (event) => { 
			if (event.target === this.container) { 
				this.events.emit('card:select', { card: this }); 
			} 
		}); 
		 
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
	} 
 
	render(cardData: Partial<IProduct> | undefined) {  
        const { ...otherCardData } = cardData; 
        Object.assign(this, otherCardData); 
		this.isAddButtonDisabled(Boolean(cardData))
		return super.render(otherCardData);  
    } 

	isAddButtonDisabled(isDisabled: boolean) {
        if (this.addBasketButton) {
            this.setDisabled(this.addBasketButton, isDisabled);
        }
    }

	set index(index: number) { 
        if (this.cardItem) { 
        	this.setText(this.cardItem, index); 
    	} 
	} 
 
	set description(description: string) { 
		if(this._description) { 
			this.setText(this._description, description); 
		} 
	} 
 
	set image(value: string) { 
		if(this._image) { 
			this.setImage(this._image, value, this.title) 
		}   
    } 
 
	set title(title: string) { 
		this.setText(this._title, title); 
	} 
 
	set category(category: string) { 
		if (this._category) { 
			const categoryClasses = [ 
				'card__category_other',  
				'card__category_soft',  
				'card__category_hard',  
				'card__category_additional',  
				'card__category_button' 
			]; 
	 
			this._category.classList.remove(...categoryClasses); 
 
			this._category.textContent = category;       
			 
			const categoryClassMap: Record<string, string> = { 
				'другое': 'card__category_other', 
				'дополнительное': 'card__category_additional', 
				'софт-скил': 'card__category_soft', 
				'хард-скил': 'card__category_hard', 
				'кнопка': 'card__category_button', 
			}; 
	 
			const classToAdd = categoryClassMap[category]; 
			if (classToAdd) { 
				this._category.classList.add(classToAdd); 
			} 
		} 
	} 
 
	set price(price: number | null) { 
		// this._priceValue = price; 
	 
		if (this._price) { 
			if (price === null) { 
				this.setText(this._price, 'Бесценный'); // Выводим "Бесценный" 
				 
			} else { 
				this.setText(this._price, `${price} синапсов`); // Выводим цену как есть 
			} 
		} 
		if (this.addBasketButton) { 
			this.addBasketButton.disabled = price === null; // Делаем кнопку неактивной, если цена null 
		} 
	} 

	 
	set id(id) { 
		this._id = id; 
	} 
 
	get id() { 
		return this._id; 
	} 
 
	deleteCard() { 
		this.container.remove(); 
		this.container = null; // освобождение памяти 
	} 
} 

