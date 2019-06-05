import { Actions, ActionTypes } from './actions';
import { State, initialState, adapter } from './state';

export function reducer(state = initialState, action: Actions): State {
    switch (action.type) {

        case ActionTypes.LoadSuccess: {
            return adapter.addOne(action.payload, state);
        }

        case ActionTypes.SaveSuccess: {
            return adapter.updateOne(action.payload, state);
        }

        default: {
            return state;
        }
    }
}
