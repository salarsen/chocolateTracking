import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';
import { batchService } from '../../services/batch.service';
import { Batch } from '../../class/batch';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  batch : Array<Batch> = [];

  constructor(
    private auth: authService,
    private batchService : batchService,
    private router: Router
  ) { }

  ngOnInit() : void {
    if (!this.auth.isAuthed()) {
      console.log('Not authed');
      this.router.navigate(['home']);
    }

    this.batchService.getBatches()
      .subscribe(batch => {
        console.log(batch);
        this.batch = batch;
      }, error => {
        console.log(`There was an error ${error}`)
      });
  }

}
