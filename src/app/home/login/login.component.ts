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
      .then((res) => {
        console.log(res)
        console.log('Attempting to redirect to Batch')
        this.router.navigate(['batch'])
      })
      .catch(response => this.handleErrors(response.json()));
  }

  private handleErrors(errors : string[] | Error) : void {
    console.log(errors);
    this.loginErrors = Array.isArray(errors) ? errors : [errors.message];
  }
}
