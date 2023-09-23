import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/data-type.ts';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: Product[] = [];
  product: any;

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProductList();


  }

  getAllProductList() {
    this._productService.getProductList().subscribe((productRes: Product[]) => {
      console.log(productRes)
      this.productList = productRes;
    })
  }

  deleteProduct(product: Product) {
    this._productService.deleteProductWithId(product?.id).subscribe(productRes => {
      console.log(productRes);
      this.getAllProductList();
    })
  }

  updateProduct(product: Product) {
    this._router.navigate(["./seller-update-product", product.id]);
  }
}
