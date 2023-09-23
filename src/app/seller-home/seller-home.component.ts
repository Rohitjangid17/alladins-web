import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/interfaces/data-type.ts';
import { ProductService } from '../core/services/product.service';

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
