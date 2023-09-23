import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/data-type.ts';

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
    console.log(query);

    query && this._productService.searchProducts(query).subscribe((searchRes) => {
      console.log(searchRes)
      if (query) {
        this.searchQuery = searchRes;
      }
      console.log(this.searchQuery);
    })
  }
}
