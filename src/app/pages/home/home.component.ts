import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

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
    })
  }

  trendyProductList() {
    this._productService.getTrendyProducts().subscribe((trendyProductsRes) => {
      this.trendyProducts = trendyProductsRes;
    })
  }
}
