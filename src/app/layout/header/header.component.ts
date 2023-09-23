import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string = "";
  searchResult: Product[] = [];
  userName: string = "";
  cartItem: number = 0;

  constructor(
    private _router: Router,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this._router.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          const sellerStore = localStorage.getItem('seller');
          const sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData?.userName;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          const userStore = localStorage.getItem('user');
          const userData = userStore && JSON.parse(userStore);
          this.userName = userData?.userName;
          this.menuType = 'user';
          this._productService.getCartList(userData?.id)
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem("localCart");
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this._productService.cartData.subscribe((items) => {
      this.cartItem = items.length;
    })
  }

  sellerLogout() {
    localStorage.removeItem("seller");
    this._router.navigate(["/home"]);
  }

  userLogout() {
    localStorage.removeItem("user");
    this._router.navigate(["/user-auth"]);

    this._productService.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this._productService.searchProducts(element.value).subscribe(searchProductRes => {
        if (searchProductRes.length > 5) {
          searchProductRes.length = 5;
        }
        this.searchResult = searchProductRes;
      })
    }
  }

  hideSearch() {
    this.searchResult = [];
  }

  searchDataResult(value: string) {
    this._router.navigate(["/search", value]);
  }

  productDetailsNavigateById(id: number) {
    this._router.navigate(["product-details/" + id])
  }
}
