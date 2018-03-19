import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';
import { batchService } from '../../services/batch.service';
import { Batch } from '../../class/batch';
// import { NgStyle } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  batch : Array<Batch> = [];
  modal : Batch = new Batch();

  constructor(
    private auth: authService,
    private batchService : batchService,
    private router: Router
  ) { }

  ngOnInit() : void {

    this.batchService.getBatches()
      .subscribe(batch => {
        console.log(batch);
        this.batch = batch;
      }, error => {
        console.log(`There was an error ${error}`)
      });
  }

  populateModal(event : Event, batch : Batch) : void {
    console.log(batch);
    // console.log()
    this.modal = batch;
  }

}
