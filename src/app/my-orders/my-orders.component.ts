import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$;
  subscription: Subscription;
  userId: string;

  constructor(private orderService: OrderService,
              private authService: AuthService) {}

  async ngOnInit() {
    this.subscription = await this.authService.$user.subscribe(user => this.userId = user.uid);
    this.orders$ = await this.orderService.getOrdersByUser(this.userId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
