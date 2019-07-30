import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  appUser$;
  private destroy$ = new Subject();
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService,
              private cartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  async ngOnInit() {

    this.auth.appUser$.pipe(takeUntil(this.destroy$))
          .subscribe(user => this.appUser$ = user );

    this.cart$ = await this.cartService.getCart();
  }
}
