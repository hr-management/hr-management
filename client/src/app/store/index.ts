import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromLogin from './auth/users.reducer';


export interface AppState {
  [fromLogin.loginFeatureKey]: fromLogin.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromLogin.loginFeatureKey]: fromLogin.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
