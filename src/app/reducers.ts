import { ActionReducer, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import {reducer as documentReducer} from './store/reducer';

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state: any, action: any): any {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [logger, storeFreeze];

export const reducers: ActionReducerMap<any> = {
    document: documentReducer
};
