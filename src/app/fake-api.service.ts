import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const documents = [
      {
        id: 'A',
        description: 'Document A. Can edit',
        canEdit: true
      },
      {
        id: 'B',
        description: 'Document B. Cannot edit'
      }
    ];

    return {
      documents
    };
  }
}
