import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/seller-home.component';
import { SearchComponent } from './pages/search/search.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { SellerAuthComponent } from './core/auth/seller-auth/seller-auth.component';
import { UserAuthComponent } from './core/auth/user-auth/user-auth.component';
import { SellerUpdateProductComponent } from './pages/products/seller-update-product/seller-update-product.component';
import { SellerAddProductComponent } from './pages/products/seller-add-product/seller-add-product.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SellerAuthComponent,
    ProductsComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartSummaryComponent,
    CheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
