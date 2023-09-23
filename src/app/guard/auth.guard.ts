import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SellerService } from "../services/seller.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {
  constructor(
    private _sellerService: SellerService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('seller')) {
      return true;
    }
    console.log(this._sellerService.isSellerLoggedIn);  
    return this._sellerService.isSellerLoggedIn;
  }
}