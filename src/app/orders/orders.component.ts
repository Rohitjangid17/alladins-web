import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../interfaces/data-type.ts';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: Order[] = [];
  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllOrdersList();
  }

  getAllOrdersList() {
    this._productService.orderList().subscribe((orderListRes) => {
      this.orderList = orderListRes;
      console.log(this.orderList);
    })
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this._productService.cancelOrder(orderId).subscribe((orderCancelRes) => {
      this.getAllOrdersList();
    })
  }
}
