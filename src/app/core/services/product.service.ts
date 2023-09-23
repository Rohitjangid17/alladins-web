import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../interfaces/data-type.ts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[]>();

  constructor(
    private _httpClient: HttpClient
  ) { }

  addProduct(data: Product) {
    return this._httpClient.post("http://localhost:3000/products", data);
  }

  getProductList(): Observable<Product[]> {
    return this._httpClient.get<Product[]>("http://localhost:3000/products");
  }

  deleteProductWithId(id: number) {
    return this._httpClient.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProductWithId(product: Product): Observable<Product> {
    return this._httpClient.put<Product>(`http://localhost:3000/products/${product.id}`, product);
  }

  getPopularProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>("http://localhost:3000/products?_limit=3");
  }

  getTrendyProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>("http://localhost:3000/products?_limit=8");
  }

  searchProducts(query: string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`http://localhost:3000/products?q=${query}`);
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
    return this._httpClient.post("http://localhost:3000/cart", cartData)
  }

  getCartList(userId: number) {
    return this._httpClient.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`,
      { observe: "response" }).subscribe((cartListRes) => {
        if (cartListRes && cartListRes.body) {
          this.cartData.emit(cartListRes.body)
        }
      })
  }

  removeToCart(cartId: number) {
    return this._httpClient.delete(`http://localhost:3000/cart/${cartId}`)
  }

  currentCart() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this._httpClient.get<Cart[]>(`http://localhost:3000/cart?userId=${userData?.id}`)
  }

  orderNow(data: Order) {
    return this._httpClient.post("http://localhost:3000/orders", data);
  }

  orderList() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this._httpClient.get<Order[]>(`http://localhost:3000/orders?userId=${userData.id}`);
  }

  deleteCartItems(cartId: number) {
    return this._httpClient.delete(`http://localhost:3000/cart/${cartId}`, { observe: "response" }).subscribe((cartRes) => {

      if (cartRes) {
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId: number) {
    return this._httpClient.delete(`http://localhost:3000/orders/${orderId}`)
  }
}
