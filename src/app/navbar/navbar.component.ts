import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  appUser$;
  private destroy$ = new Subject();
  shoppingCartItemCount: number;

  constructor(public auth: AuthService,
              private cartService: ShoppingCartService) {
    this.auth.appUser$.pipe(takeUntil(this.destroy$))
    .subscribe(user =>
      this.appUser$ = user
    );
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      // tslint:disable-next-line: forin
      for (const product in cart.items) {
        this.shoppingCartItemCount += cart.items[product].quantity;
      }
    });
  }
}
