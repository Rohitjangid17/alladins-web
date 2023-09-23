import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

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
    })
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this._productService.cancelOrder(orderId).subscribe((orderCancelRes) => {
      this.getAllOrdersList();
    })
  }
}
