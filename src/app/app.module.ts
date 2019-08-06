import { OrderService } from './order.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'ng-angular8-datatable';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent},
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
