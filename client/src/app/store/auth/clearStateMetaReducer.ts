import { Action, ActionReducer } from '@ngrx/store';
import { LogoutType } from './logout.actions';
export function clearStateMetaReducer<State>(reducer: ActionReducer<State>) {
    return function clearStateFn(state: State, action: Action) {
        
        if (action.type === LogoutType) {
            state = {} as State; // ==> Emptying state here
    }
    return reducer(state, action);
   };
}