import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../interfaces/data-type.ts';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = "https://rohitjangid17.github.io/alladin-api/database.json";
  cartData = new EventEmitter<Product[]>();

  constructor(
    private _httpClient: HttpClient
  ) { }

  addProduct(data: Product) {
    return this._httpClient.post(this.apiUrl + "/products", data);
  }

  getProductList(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.apiUrl + "/products");
  }

  deleteProductWithId(id: number) {
    return this._httpClient.delete(`${this.apiUrl}/products/${id}`);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  updateProductWithId(product: Product): Observable<Product> {
    return this._httpClient.put<Product>(`${this.apiUrl}/products/${product.id}`, product);
  }

  getPopularProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.apiUrl + "/products?_limit=3");
  }

  getTrendyProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.apiUrl + "/products?_limit=8");
  }

  searchProducts(query: string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.apiUrl}/products?q=${query}`);
  }

  localAddToCart(data: Product) {
    let cartData: Product[] = [];
    let localCart = localStorage.getItem("localCart");

    if (!localCart) {
      localStorage.setItem("localCart", JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem("localCart", JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem("localCart");
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => {
        return productId !== item.id;
      });
      localStorage.setItem("localCart", JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    return this._httpClient.post(this.apiUrl + "/cart", cartData)
  }

  getCartList(userId: number) {
    return this._httpClient.get<Product[]>(`${this.apiUrl}/cart?userId=${userId}`,
      { observe: "response" }).subscribe((cartListRes) => {
        console.log(cartListRes)
        if (cartListRes && cartListRes.body) {
          this.cartData.emit(cartListRes.body)
        }
      })
  }

  removeToCart(cartId: number) {
    return this._httpClient.delete(`${this.apiUrl}/cart/${cartId}`)
  }

  currentCart() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this._httpClient.get<Cart[]>(`${this.apiUrl}/cart?userId=${userData?.id}`)
  }

  orderNow(data: Order) {
    return this._httpClient.post(this.apiUrl + "/orders", data);
  }

  orderList() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this._httpClient.get<Order[]>(`${this.apiUrl}/orders?userId=${userData.id}`);
  }

  deleteCartItems(cartId: number) {
    return this._httpClient.delete(`${this.apiUrl}/cart/${cartId}`, { observe: "response" }).subscribe((cartRes) => {
      console.log(cartRes)

      if (cartRes) {
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId: number) {
    return this._httpClient.delete(`${this.apiUrl}/orders/${orderId}`)
  }
}
