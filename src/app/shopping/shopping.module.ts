import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { ProductFilterComponent } from './component/products/product-filter/product-filter.component';
import { ProductsComponent } from './component/products/products.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './component/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    ])
  ]
})
export class ShoppingModule { }
