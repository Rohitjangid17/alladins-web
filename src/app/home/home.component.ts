import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/data-type.ts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProducts: Product[] = [];
  trendyProducts: Product[] = [];

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.popularProductList();
    this.trendyProductList();
  }

  popularProductList() {
    this._productService.getPopularProducts().subscribe((popularProductsRes) => {
      this.popularProducts = popularProductsRes;
      console.log(this.popularProducts);
    })
  }

  trendyProductList() {
    this._productService.getTrendyProducts().subscribe((trendyProductsRes) => {
      this.trendyProducts = trendyProductsRes;
    })
  }
}
