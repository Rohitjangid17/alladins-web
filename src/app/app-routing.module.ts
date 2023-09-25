import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { ProductsComponent } from './pages/products/seller-home.component';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './pages/seller-update-product/seller-update-product.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

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
