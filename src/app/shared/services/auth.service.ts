import { switchMap, materialize, dematerialize, delay } from 'rxjs/operators';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, empty } from 'rxjs';
import { of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.$user = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  get appUser$(): Observable<AppUser> {
    return this.$user
      .pipe(
          switchMap(user => {
            return user ? this.userService.get(user.uid) : of(null);
          })
      );
  }

}
