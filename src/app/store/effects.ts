import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, mergeMap } from 'rxjs/operators';

import { ActionTypes, Load, LoadSuccess, Save, SaveSuccess} from './actions';
import * as selectors from './selectors';
import { Document } from '../models';

@Injectable()
export class DocumentEffects {

    private url = 'api/documents';

    @Effect()
    load$: Observable<Action> = this.actions$.pipe(
        ofType<Load>(ActionTypes.Load),
        withLatestFrom(this.store$.pipe(select(selectors.getDocumentState))),
        filter(([action, state]) => !selectors.selectEntities(state)[action.payload]),
        map(([action]) => action.payload),
        switchMap(id => {
            return this.http.get<Document>(`${this.url}/${id}`).pipe(
                map(result => new LoadSuccess(result))
            );
            // return of(new LoadSuccess({id, description: 'testing...'}));
        })
    );

    @Effect()
    save$: Observable<Action> = this.actions$.pipe(
        ofType<Save>(ActionTypes.Save),
        map(action => action.payload),
        switchMap(payload => {
            return of(new SaveSuccess(payload));
        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<any>,
        private readonly http: HttpClient
    ) {}
}
