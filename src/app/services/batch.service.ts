import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Batch } from '../class/batch';

import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class batchService {

  public static base = '/api/batches/';
  constructor(private http : Http) { }

  getBatches() : Observable<Batch[]> {
    return this.http.get(batchService.base)
      .map(response => response.json());
  }

  removeBatch(batch : Batch) : Observable<Batch> {
    return this.http.delete(`${ batchService.base }${ batch._id }`)
      .map(response => response.json());
  }

  createBatch(batch: Batch): Observable<Batch> {
    return this.http.post(batchService.base, batch)
      .map(response => response.json());
  }

  getBatch(id : string) : Observable<Batch> {
    return this.http.get(`${ batchService.base }${id}`)
      .map(response => response.json());
  }

  updateBatch(batch : Batch) : Observable<Batch> {
    return this.http.patch(batchService.base, batch)
      .map(response => response.json());
  }
}
