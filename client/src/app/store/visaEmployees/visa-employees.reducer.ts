import { createReducer, on } from '@ngrx/store';
import * as VisaEmployeesActions from './visa-employees.actions';

export const visaEmployeesFeatureKey = 'visaEmployees';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

