import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: Product[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    let query = this._activatedRoute.snapshot.paramMap.get("query");

    query && this._productService.searchProducts(query).subscribe((searchRes) => {
      if (query) {
        this.searchQuery = searchRes;
      }
    })
  }
}
