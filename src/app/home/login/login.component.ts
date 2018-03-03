import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { authService } from '../../services/auth.service';

import { User } from '../../class/user';

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user : User = new User();

  loginErrors : string [] = [];

  constructor(private auth : authService, private router : Router) { }

  onSubmit() : void {
    this.auth.login(this.user)
      .then(() => this.router.navigate(['batch']))
      .catch(response => this.handleErrors(response.json()));
  }

  private handleErrors(errors : string[] | Error) : void {
    this.loginErrors = Array.isArray(errors) ? errors : [errors.message];
  }
}
