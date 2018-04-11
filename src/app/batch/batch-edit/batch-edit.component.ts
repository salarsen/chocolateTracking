import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { batchService } from '../../services/batch.service';

import { Batch } from '../../class/batch';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.css']
})
export class BatchEditComponent implements OnInit {

  @Input()
  batch: Batch;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private batchService: batchService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.switchMap(params => {
      return this.batchService.getBatch(params.get('id'));
    })
      .subscribe(batch => {
        console.log(`Got batch ${batch}`);

        this.batch = batch;
      }, error => {
        console.log(`Error: ${error}`)
      })
  }

}
