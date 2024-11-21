export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}


export interface IProductsData {
    items: IProduct[];
    preview: string | null; // указатель на карточку
    getProduct(productId: string): IProduct; 
    // setItems (items: IProduct[]): void;
}


export interface IUserPayment  {
    paymentMethod: string;
    address: string;
}

export interface IUserСontacts {
    email: string;
    phone: string;
}








// данные корзины
export interface IBasketData {
    items: IProduct[];
    preview: string | null;
    addProduct(product: IProduct): void; // void - ничего не возвращает 
    deleteProduct(productId: string, payload: Function | null): void;  // payload - доп нагрузка (чтобы это не значило)
    getProduct(productId: string): IProduct;
    // getTotalPrice(): number;
    // clear(): void;
}

// заказ
export interface IOrderData {
    basketData: IBasketData;
    // basket: IProduct[];
    userPayment: IUserPayment;
    userСontacts: IUserСontacts;
    getOrderInfo(): object;
    // checkValidation(): boolean;
}












export interface IOrderResult {
    id: string;
    total: number;
}

// export type TCardInfo = Pick<IProduct, 'category' | 'title' | 'description' |  'price' | 'image'>
// export type TBasketInfo = Pick<IProduct, 'title' | 'price'>
// export type TPaymentForm = Pick<IUser, 'paymentMethod' | 'address'>
// export type TContactForm = Pick<IUser, 'email' | 'telephone'>