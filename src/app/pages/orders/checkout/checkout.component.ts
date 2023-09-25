import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, Order } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orderDataForm: FormGroup;
  totalPrice: number = 0;
  cartData: Cart[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) {
    this.orderDataForm = this._formBuilder.group({
      email: [''],
      address: [''],
      phoneNumber: [''],
    })
  }

  ngOnInit(): void {
    this._productService.currentCart().subscribe((currentCartRes) => {
      let price = 0;
      this.cartData = currentCartRes;
      currentCartRes.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.productPrice * +item.quantity)
        }
      });
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
    })
  }

  orderNow() {
    let user = localStorage.getItem("user");
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: Order = {
        ...this.orderDataForm.value,
        totalPrice: this.totalPrice,
        userId
      }

      this.cartData?.forEach((cartItem) => {
        setTimeout(() => {
          cartItem.id && this._productService.deleteCartItems(cartItem?.id);
        }, 700);
      });
      this._productService.orderNow(orderData).subscribe((orderRes) => {
        if (orderRes) {
          alert("Your order has been placed!!");
          setTimeout(() => {
            this._router.navigate(['/orders']);
          }, 3000);
        }
      })
    }

  }
}
