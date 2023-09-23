export interface Signup {
    userName: string,
    userPassword: string,
    userEmail: string
}

export interface Login {
    userPassword: string,
    userEmail: string
}

export interface Product {
    id?: number | any,
    productName: string,
    productPrice: string,
    productColor: string,
    productCategory: string
    productDescription: string,
    productImageUrl: string,
    quantity?: undefined | number,
    productId?: number | undefined,
}

export interface Cart {
    id?: number | any,
    productName: string,
    productPrice: string,
    productColor: string,
    productCategory: string
    productDescription: string,
    productImageUrl: string,
    quantity?: undefined | number,
    userId: number,
    productId: number
}

export interface PriceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface Order {
    email: string,
    address: string,
    phoneNumber: string,
    totalPrice: number,
    userId: number,
    id?: number | undefined,
}