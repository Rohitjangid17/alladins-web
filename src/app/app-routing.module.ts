import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/seller-home.component';
import { SearchComponent } from './pages/search/search.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { SellerAuthComponent } from './core/auth/seller-auth/seller-auth.component';
import { UserAuthComponent } from './core/auth/user-auth/user-auth.component';
import { SellerAddProductComponent } from './pages/products/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './pages/products/seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CheckoutComponent } from './pages/orders/checkout/checkout.component';

const routes: Routes = [
  {
    path: "", redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: "home", component: HomeComponent,
  },
  {
    path: "seller-auth", component: SellerAuthComponent
  },
  {
    path: "products", component: ProductsComponent, canActivate: [AuthGuard]
  },
  {
    path: "seller-add-product", component: SellerAddProductComponent, canActivate: [AuthGuard]
  },
  {
    path: "seller-update-product/:id", component: SellerUpdateProductComponent, canActivate: [AuthGuard]
  },
  {
    path: "search/:query", component: SearchComponent
  },
  {
    path: "product-details/:productId", component: ProductDetailsComponent
  },
  {
    path: "user-auth", component: UserAuthComponent
  },
  {
    path: "cart-summary", component: CartSummaryComponent
  },
  {
    path: "checkout", component: CheckoutComponent
  },
  {
    path: "orders", component: OrdersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
