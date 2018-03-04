import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../services/auth.service';
// nav component

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  constructor(private auth : authService, private router : Router) { }

  ngOnInit() {
    if(!this.auth.isAuthed()){
      console.log('Not authed');
      this.router.navigate(['home']);
    }
  }

}
