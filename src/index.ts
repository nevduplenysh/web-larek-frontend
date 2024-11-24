import './scss/styles.scss';
import { AppApi } from "./components/AppApi";
import { Api } from "./components/base/api";
import { EventEmitter } from "./components/base/events";
import { BasketData } from "./components/BasketData";
import { OrderData } from "./components/IOrderData";
import { ProductsData } from "./components/IProductsData";
import { IApi, IProduct } from "./types";
import { API_URL, CDN_URL, settings } from "./utils/constants";
import { Card } from './components/Card';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { CardsContainer } from './components/CardsContainer';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Page } from './components/Page';
// import { CardData } from './components/CardData';
import { FormOrder } from './components/FormOrder';
import { PaymentDetailsForm } from './components/PaymentDetailsForm';
import { ContactDetailsForm } from './components/ContactDetailsForm';






const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi, CDN_URL);
events.onAll((event) => {
    console.log(event.eventName, event.data)
})

const page = new Page(document.body, events);
const productsData = new ProductsData(events); // массив товаров
const basketData = new BasketData(events); // данные корзины
// const orderData = new OrderData(basketData, events); // данные заказа

const cardTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardModalTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-preview'); 
const galleryContainer = new CardsContainer(ensureElement<HTMLTemplateElement>('.gallery'));
// const basketCounter = new BasketCounter(ensureElement<HTMLTemplateElement>('.header__basket'), events);
const basketCounter = document.querySelector('.header__basket');
const basketTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#basket'); // это клон темплейта всей корзины
const cardBasketTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-basket'); // карточка корзины

const formOderTemplete: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplete: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#contacts');

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderData = new OrderData(events);

  
api.getCards()
    .then((cards) => {
        productsData.items = cards;
    })
    .catch((err) => {
        console.error("Ошибка загрузки продуктов:", err);
    });


    events.on("catalog:changed", () => {
        const cardsArray = productsData.items.map((card) => {
            const cardInstance = new Card(cloneTemplate(cardTemplate), events);
            return cardInstance.render(card);
        });
    
        galleryContainer.render({ catalog: cardsArray });
    });



// выбрать карточку
events.on(`card:select`, (data: { card: Card }) => {
    const { card } = data;
    const productModalData = productsData.getProduct(card.id);
    console.log(productModalData)   
    const cardModal = new Card(cloneTemplate(cardModalTemplate), events);

    modal.render({
        content: cardModal.render(productModalData)
    });
})


events.on('card:add', (data: { card: Card }) => {
    const { card } = data; 
    const basketItemData = productsData.getProduct(card.id);
    basketData.addProduct(basketItemData); // обновленный массив данных корзины  
    modal.close();
  
  });

events.on('basket:open', () => {
    modal.render({
        content: createElement<HTMLElement>('div', {}, [
            basket.render()
        ])
    });
});

events.on('card:delete', (data: { card: Card }) => {
    const { card } = data; 
    const basketItemData = productsData.getProduct(card.id);
    basketData.deleteProduct(basketItemData.id); // обновленный массив данных корзины  
  });

events.on('basket:changed', (data: { items: IProduct[] }) => {
    const { items } = data;
    basket.items = items.map((product, index) => {
        const cardBasket = new Card(cloneTemplate(cardBasketTemplate), events);
        cardBasket.index = index + 1;
        return cardBasket.render(product);
    });

    const basketTotal = basketData.getTotalPrice();
    basket.total = basketTotal || 0;
    // page.counter = basketData.currentCardIndex;
    page.counter = items.length;
    
    modal.render({ 
        content: basket.render()  // Обновляем отображение корзины в модальном окне
    });

    
});

events.on('formPayment:open', () => {
    const paymentForm = new PaymentDetailsForm(cloneTemplate(formOderTemplete), events, orderData);

    modal.render({
        content: paymentForm.render({
            address: "", // начальное значение адреса
            paymentMethod: 'card', // начальное значение способа оплаты
        })
    });
    const allUserData = orderData.order;
    console.log(allUserData);
    console.log(orderData.getOrderInfo())
});

events.on('formContacts:open', () => {
    const contactForm = new ContactDetailsForm(cloneTemplate(formContactsTemplete), events, orderData);

    modal.render({
        content: contactForm.render({
            email: "", // начальное значение email
            phone: "", // начальное значение phone
        })
    });

    const allUserData = orderData.order;
    console.log(allUserData);
    console.log(orderData.getOrderInfo())
});



console.log(orderData.getOrderInfo())

// Пример получения всех данных пользователя
const allUserData = orderData.order;
console.log(allUserData);


// Обработчик для изменения способа оплаты
events.on('order.paymentMethod:change', (data: { paymentMethod: "card" | "cash" }) => {
    console.log(`Способ оплаты изменен: ${data.paymentMethod}`);
    // Логика сохранения способа оплаты
});

// Обработчик для изменения адреса
events.on('order.address:change', (data: { value: string }) => {
    console.log(`Адрес изменен: ${data.value}`);
    // Логика сохранения адреса
});

// Обработчик для отправки формы
// events.on('paymentForm:submit', () => {
//     console.log('Форма отправлена!');
//     const isValid = orderData.validateOrder(); // Проверяем валидность
//     if (isValid) {
//         console.log('Данные успешно отправлены:', orderData.getOrderInfo());
//         modal.close();
//     } else {
//         console.error('Ошибка валидации:', orderData.formErrors);
//     }
// });


// events.on('contactForm:submit', () => {
//     console.log('Форма отправлена!');
//     const isValid = orderData.validateOrder(); // Проверяем валидность
//     if (isValid) {
//         console.log('Данные успешно отправлены:', orderData.getOrderInfo());
//         modal.close();
//     } else {
//         console.error('Ошибка валидации:', orderData.formErrors);
//     }
// });

events.on('contactForm:submit', () => {
    console.log('Форма отправлена!');

    const isValid = orderData.validateOrder(); // Проверяем валидность
    if (isValid) {
        const contactData = orderData.getOrderInfo(); // Получаем данные формы
        console.log(contactData)

        // Отправляем данные на сервер через API
        api.postOrder(orderData.getOrderInfo())
            .then((response) => {
                console.log('Данные успешно отправлены на сервер:', response);

                // Закрываем модальное окно после успешной отправки
                modal.close();

                // Можно добавить уведомление об успехе для пользователя
                events.emit('form:success', { message: 'Контактная форма успешно отправлена!' });
            })
            .catch((error) => {
                console.error('Ошибка при отправке данных на сервер:', error);

                // Можно добавить уведомление об ошибке для пользователя
                events.emit('form:error', { message: 'Ошибка отправки данных. Попробуйте снова.' });
            });
    } else {
        console.error('Ошибка валидации:', orderData.formErrors);

        // Отображаем ошибки пользователю
        const errors = Object.entries(orderData.formErrors)
            .map(([field, message]) => `${field}: ${message}`)
            .join('\n');
        
        alert(`Ошибки валидации:\n${errors}`);
    }
});


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});









