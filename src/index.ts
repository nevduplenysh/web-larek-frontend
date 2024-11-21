import { EventEmitter } from './components/base/events';
import { BasketData } from './components/BasketData';
import { OrderData } from './components/IOrderData';
import './scss/styles.scss';


const events = new EventEmitter();

const productsData = new BasketData(events);


const orderData = new OrderData(productsData, events);

const testCard = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
}



const testCards = [{
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
},
{
    "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    "image": "/Shell.svg",
    "title": "HEX-леденец",
    "category": "другое",
    "price": 1450
},
{
    "id": "b06cde61-912f-4663-9751-09956c0eed67",
    "description": "Будет стоять над душой и не давать прокрастинировать.",
    "image": "/Asterisk_2.svg",
    "title": "Мамка-таймер",
    "category": "софт-скил",
    "price": null
}]

productsData.items = testCards;
console.log(productsData)

productsData.addProduct(testCard)
console.log(productsData)




// Установить данные оплаты и контакты
orderData.userPayment.paymentMethod = "Карта";
orderData.userPayment.address = "ул. Примерная, д. 1";
orderData.userСontacts.email = "example@mail.com";
orderData.userСontacts.phone = "+123456789";

// Проверить информацию о заказе
const orderInfo = orderData.getOrderInfo();
console.log("Информация о заказе:", orderInfo);



// Добавляем товары в корзину
productsData.addProduct(testCard);
console.log("Товары в корзине:", productsData.items);

// Устанавливаем платежные данные
orderData.userPayment.paymentMethod = "Банковская карта";
orderData.userPayment.address = "ул. Ленина, д. 10";

// Устанавливаем контактные данные
orderData.userСontacts.email = "user@example.com";
orderData.userСontacts.phone = "+79012345678";

// Получаем данные о заказе
const fullOrder = orderData.getOrderInfo();
console.log("Полная информация о заказе:", fullOrder);