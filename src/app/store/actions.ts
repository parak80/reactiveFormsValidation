import { Action } from '@ngrx/store';
// import { Update } from '@ngrx/entity';

import { Document } from '../models';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
    Load = '[Document] Load',
    LoadSuccess = '[Document] Load Success',
    Save = '[Document] Save',
    SaveSuccess = '[Document] Save Success'
}

export class Load implements Action {
    readonly type = ActionTypes.Load;
    constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
    readonly type = ActionTypes.LoadSuccess;
    constructor(public payload: Document) {}
}

export class Save implements Action {
    readonly type = ActionTypes.Save;
    constructor(public payload: Update<Document>) {}
}

export class SaveSuccess implements Action {
    readonly type = ActionTypes.SaveSuccess;
    constructor(public payload: Update<Document>) {}
}

export type Actions = Load | LoadSuccess | Save | SaveSuccess;
