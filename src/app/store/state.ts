import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Document } from '../models';

export const adapter: EntityAdapter<Document> = createEntityAdapter({
    selectId: model => model.id
});

export interface State extends EntityState<Document> {}

export const initialState: State = adapter.getInitialState({});
