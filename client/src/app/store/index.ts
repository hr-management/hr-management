import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { clearStateMetaReducer } from './auth/clearStateMetaReducer';

import * as fromUser from './auth/users.reducer';


export interface AppState {
  [fromUser.loginFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.loginFeatureKey]: fromUser.reducer,
};


// export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
export const metaReducers: MetaReducer<any>[] = [clearStateMetaReducer];
