import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
          .pipe(map(appUser => {
            if (appUser) {
              if (appUser.isAdmin) {
                return appUser.isAdmin;
              }
              this.router.navigate(['/']);
              return false;
            }
            return false;
          })
        );
  }
}
