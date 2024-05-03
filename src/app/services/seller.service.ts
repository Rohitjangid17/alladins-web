import { CSP_NONCE, EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login, Signup } from '../interfaces/data-type.ts';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  apiUrl: string = "https://rohitjangid17.github.io/alladin-api/database.json";

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

  userSignup(data: Signup) {
    this._httpClient.post(this.apiUrl + "/seller", data, { observe: 'response' }).subscribe(result => {
      // this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this._router.navigate(["seller-home"]);
    });
  }

  userLogin(data: Login) {
    this._httpClient.get(`${this.apiUrl}/seller?userEmail=${data.userEmail}&userPassword=${data.userPassword}`, { observe: "response" }).subscribe((result: any) => {
      console.log(result);
      if (result && result.body && result.body.length) {
        console.log("User Login " + result);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this._router.navigate(["seller-home"]);
      } else {
        console.log("Login failed");
        this.isLoginError.emit(true);
      }
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this._router.navigate(["seller-home"]);
    }
  }
}
