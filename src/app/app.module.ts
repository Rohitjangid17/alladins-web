import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { SellerAuthComponent } from './core/auth/seller-auth/seller-auth.component';
import { UserAuthComponent } from './core/auth/user-auth/user-auth.component';
import { CheckoutComponent } from './pages/orders/checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SellerAddProductComponent } from './pages/seller-home/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './pages/seller-home/seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './pages/seller-home/product-details/product-details.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SellerAuthComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartSummaryComponent,
    CheckoutComponent,
    OrdersComponent,
    SellerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
