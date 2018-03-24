import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { authService } from '../../services/auth.service';

import { User } from '../../class/user';

@Component({
  selector: 'home-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user : User = new User();

  registrationErrors : string[] = [];

  constructor(private auth : authService, private router : Router) { }

  onSubmit() : void {
    this.auth.register(this.user)
      .then(() => {
        console.log('Attempting to redirect to Batch')
        this.router.navigate(['batch'])
      })
      .catch(response => this.handleErrors(response.json()));
  }

  private handleErrors(errors: string[] | Error): void {
    console.log(errors);
    this.registrationErrors = Array.isArray(errors) ? errors : [errors.message];
  }
}
