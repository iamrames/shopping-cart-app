import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  appUser$;
  private destroy$ = new Subject();

  constructor(public auth: AuthService ) {
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
}
