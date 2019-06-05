import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Document } from './models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'api/documents';

  constructor(private readonly _http: HttpClient) { }

  getAllDocuments() {
    return this._http.get<Document[]>(this.url);
  }
}
