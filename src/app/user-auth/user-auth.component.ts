import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { ProductService } from '../core/services/product.service';
import { Cart, Login, Product, Signup } from '../core/interfaces/data-type.ts';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  userSignupForm: FormGroup;
  userLoginForm: FormGroup
  showLogin: boolean = false;
  authError: string = "";

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _productService: ProductService
  ) {
    // User Signup Form
    this.userSignupForm = this._formBuilder.group({
      user_name: ["", [Validators.required]],
      user_email: ["", [Validators.required]],
      user_password: ["", [Validators.required]],
    })
    // User Login Form
    this.userLoginForm = this._formBuilder.group({
      user_email: ["", [Validators.required]],
      user_password: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this._userService.userAuthReload();
  }

  // Create Signup 
  userSignup() {
    const userData: Signup = {
      userName: this.userSignupForm.get("user_name")?.value,
      userEmail: this.userSignupForm.get("user_email")?.value,
      userPassword: this.userSignupForm.get("user_password")?.value,
    }
    this._userService.userSignup(userData);
  }

  // Alredy Created User Can Login
  userLogin() {
    const userData: Login = {
      userEmail: this.userLoginForm.get("user_email")?.value,
      userPassword: this.userLoginForm.get("user_password")?.value,
    };
    console.log(userData);
    this._userService.userLogin(userData);

    this._userService.invalidUserAuth.subscribe((invalidUser: boolean) => {
      console.log("apple", invalidUser);
      if (invalidUser) {
        this.authError = "Please Enter Valid User Details";
        console.log(this.authError)
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  openUserLogin() {
    this.showLogin = true;
  }

  openUserSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem("user");
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      // let user = localStorage.getItem("user");
      // let userId = user && JSON.parse(user).id;
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = { ...product, productId: product.id, userId }
        delete cartData.id;

        setTimeout(() => {
          this._productService.addToCart(cartData).subscribe((cartDataRes) => {
            if (cartDataRes) {
              console.log("item store in DB!!")
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem("localCart");
          }
        }, 500);
      })
    }

    setTimeout(() => {
      this._productService.getCartList(userId)
    }, 2000);
  }

}
