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
    getProducts(): IProduct[];
}


// данные корзины
export interface IBasketData {
    items: IProduct[];
    // preview: string | null;
    addProduct(product: IProduct): void; 
    deleteProduct(productId: string, payload: Function | null): void; 
    getProduct(productId: string): IProduct;
    getTotalPrice(): number;
    clear(): void;
}

export interface IDataPayment {
    payment: string;
    address: string;
}
  
export interface IDataContacts {
    email: string,
    phone: string,
}


export interface IOrder extends IDataPayment, IDataContacts {
}

export interface IAppState {
    preview: string | null;
    order: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

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

