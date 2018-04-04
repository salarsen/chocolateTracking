import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// import { Response } from '@angular/http/src/static_response';

@Injectable()
export class fileService {
    public static base = environment.apiUrl;
    constructor(
        private http : Http
    ){ }

    uploadFile(fileString : object) : Observable<String> {
        return this.http.post(`${fileService.base}/upload-photo`,fileString)
            .map(response => response.json());
    }
}