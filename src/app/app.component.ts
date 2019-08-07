import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
      if (!user) { return; }

      this.userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      this.router.navigateByUrl(returnUrl);
      localStorage.removeItem('returnUrl');
    });
  }

}
