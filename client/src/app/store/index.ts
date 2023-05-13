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
import * as fromVisaEmployees from './visaEmployees/visa-employees.reducer';
// import * as fromHousing from './housing/housing.reducer';


export interface AppState {
  [fromUser.loginFeatureKey]: fromUser.State;
  [fromEmployees.employeesFeatureKey]: fromEmployees.State;
  [fromApplications.applicationsFeatureKey]: fromApplications.State;
  // [fromHousing.housingFeatureKey]: fromHousing.State;
  [fromVisaEmployees.visaEmployeesFeatureKey]: fromVisaEmployees.State;


}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.loginFeatureKey]: fromUser.reducer,
  [fromEmployees.employeesFeatureKey]: fromEmployees.reducer,
  [fromApplications.applicationsFeatureKey]: fromApplications.reducer,
  [fromVisaEmployees.visaEmployeesFeatureKey]: fromVisaEmployees.reducer,
  // [fromHousing.housingFeatureKey]: fromHousing.reducer,
};



// export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
export const metaReducers: MetaReducer<any>[] = [clearStateMetaReducer];

