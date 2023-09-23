import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../interfaces/data-type.ts';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetails!: Product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cartData!: Product;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    let productId = this._activatedRoute.snapshot.paramMap.get("productId");
    productId && this._productService.getProduct(productId).subscribe((productDetails) => {
      this.productDetails = productDetails;

      let cartData = localStorage.getItem("localCart");
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => {
          return productId === item.id.toString();
        });

        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');

      if (user) {
        let userId: number = user && JSON.parse(user).id;
        this._productService.getCartList(userId);

        this._productService.cartData.subscribe((cartData) => {
          const item = cartData.filter((product: Product) => {
            return productId?.toString() === product.productId?.toString();
          });

          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }

  handleQuantity(quantity: string) {
    if (this.productQuantity < 20 && quantity === "plus") {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && quantity === "min") {
      this.productQuantity--;
    }
  }

  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;

      if (!localStorage.getItem("user")) {
        this._productService.localAddToCart(this.productDetails);
        this.removeCart = true;
      } else {
        console.log("user is logged in!!!");
        let user = localStorage.getItem('user');
        let userId: number = user && JSON.parse(user).id;

        let cartData: Cart = {
          ...this.productDetails, userId, productId: this.productDetails.id
        }
        delete cartData.id;
        console.log(cartData);

        this._productService.addToCart(cartData).subscribe((cartRes) => {
          if (cartRes) {
            this._productService.getCartList(userId);
            this.removeCart = true;
            alert("Product is Added in cart");
          }
        })

      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem("user")) {
      this._productService.removeItemFromCart(productId);
      this.removeCart = false;
    } else {
      console.log(this.cartData);
      let user = localStorage.getItem('user');
      let userId: number = user && JSON.parse(user).id;
      this._productService.removeToCart(this.cartData.id).subscribe((cartDataRes) => {
        if (cartDataRes) {
          this._productService.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }
}
