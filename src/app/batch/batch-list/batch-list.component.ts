import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {

  constructor(
    private auth: authService,
    private router: Router
  ) { }

  ngOnInit() : void {
    if (!this.auth.isAuthed()) {
      console.log('Not authed');
      this.router.navigate(['home']);
    }
  }

}
