import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../interfaces/data-type.ts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

  userSignup(data: Signup) {
    this._httpClient.post<Signup>("http://localhost:3000/users", data, { observe: "response" })
      .subscribe((userSignupRes) => {
        if (userSignupRes) {
          localStorage.setItem('user', JSON.stringify(userSignupRes.body));
          this._router.navigate(["/home"]);
        }
      })
  }

  userLogin(data: Login) {
    this._httpClient.get<Signup[]>(`http://localhost:3000/users?userEmail=${data?.userEmail}&userPassword=${data?.userPassword}`, { observe: "response" })
      .subscribe((userRes) => {
        if (userRes && userRes.body && userRes.body.length) {
          console.log("User Login " + userRes);
          localStorage.setItem('user', JSON.stringify(userRes?.body[0]));
          this._router.navigate(["/home"]);
          this.invalidUserAuth.emit(false);
        } else {
          console.log("user not found!!!");
          this.invalidUserAuth.emit(true)
        }
      })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this._router.navigate(["/home"]);
    }
  }
}
