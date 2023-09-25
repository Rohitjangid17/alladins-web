import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/core/interfaces/data-type.ts';
import { SellerService } from 'src/app/core/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  sellerSignupForm: FormGroup;
  sellerLoginForm: FormGroup;
  loginShow: boolean = false;
  authError: string = "";

  constructor(
    private _formBuilder: FormBuilder,
    private _sellerService: SellerService,
    private _router: Router
  ) {
    this.sellerSignupForm = this._formBuilder.group({
      user_name: ["", Validators.required],
      user_password: ["", Validators.required],
      user_email: ["", Validators.required]
    });

    this.sellerLoginForm = this._formBuilder.group({
      user_email: ["", Validators.required],
      user_password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this._sellerService.reloadSeller()
  }

  signup() {
    const signupUserData: Signup = {
      userName: this.sellerSignupForm.get('user_name')?.value,
      userPassword: this.sellerSignupForm.get('user_password')?.value,
      userEmail: this.sellerSignupForm.get('user_email')?.value
    }
    this._sellerService.userSignup(signupUserData);
  }

  login() {
    this.authError = "";
    const loginUserData = {
      userEmail: this.sellerLoginForm.get('user_email')?.value,
      userPassword: this.sellerLoginForm.get('user_password')?.value,
    }
    this._sellerService.userLogin(loginUserData);
    this._sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or Password is not correct";
      }
    })
  }

  switchStage() {
    return this.loginShow = this.loginShow ? false : true;
  }
}
