import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router) {

    this.auth.$user.subscribe(user => {
      if (user) {
        const returnUrl = localStorage.getItem('returnUrl');
        this.userService.save(user);
        this.router.navigateByUrl(returnUrl);
      }
    });
  }

}
