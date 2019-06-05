import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, State } from './state';

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const getDocumentState = createFeatureSelector<State>('document');

const getEntities = createSelector(
    getDocumentState,
    selectEntities
);

export const getById = (id: string) => createSelector(
    getEntities,
    entities => entities[id]
);

