export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

// массив карточек (данные)
export interface IProductsData {
    items: IProduct[];
    preview: string | null; // указатель на карточку
    getProduct(productId: string): IProduct; 
}


// данные корзины
export interface IBasketData {
    items: IProduct[];
    preview: string | null;
    addProduct(product: IProduct): void; // void - ничего не возвращает 
    deleteProduct(productId: string, payload: Function | null): void;  // payload - доп нагрузка (чтобы это не значило)
    getProduct(productId: string): IProduct;
    getTotalPrice(): number;
    clear(): void;
}

export interface IUserData {
    paymentMethod: string;
    address: string;
    email: string;
    phone: string;
}

// заказ: хранятся данные польхователя
export interface IOrderData {
    order: IUserData;
    formErrors: FormErrors;
}

export type FormErrors = Partial<Record<keyof IUserData, string>>;

export interface IOrderState {
    valid: boolean;
    errors: string[];
    address: string;
    paymentMethod: "card" | "cash" | null;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' ;

export interface IApi {
    baseUrl: string;
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IOrderResult {
    id: string;
    total: number;
}

