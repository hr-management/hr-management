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
import * as fromEmployees from './employees/employees.reducer';
import * as fromApplications from './applications/applications.reducer';


export interface AppState {
  [fromUser.loginFeatureKey]: fromUser.State;
  [fromEmployees.employeesFeatureKey]: fromEmployees.State;  [fromApplications.applicationsFeatureKey]: fromApplications.State;



}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.loginFeatureKey]: fromUser.reducer,
  [fromEmployees.employeesFeatureKey]: fromEmployees.reducer,
  [fromApplications.applicationsFeatureKey]: fromApplications.reducer,
};


// export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
export const metaReducers: MetaReducer<any>[] = [clearStateMetaReducer];

