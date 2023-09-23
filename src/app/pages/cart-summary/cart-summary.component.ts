import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, PriceSummary } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  cartDetails: Cart[] = [];
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this._productService.currentCart().subscribe((currentCartRes) => {
      this.cartDetails = currentCartRes;
      let price = 0;

      currentCartRes.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.productPrice * item.quantity)
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;

      if (!this.cartDetails.length) {
        this._router.navigate(['/home']);
      }
    })
  }

  checkout() {
    this._router.navigate(['checkout']);
  }

  removeToCart(cartId: number) {
    cartId && this._productService.removeToCart(cartId).subscribe((cartDataRes) => {
      this.getCartDetails();
    })
  }
}
