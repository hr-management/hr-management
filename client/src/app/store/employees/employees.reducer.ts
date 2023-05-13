import { createReducer, on } from '@ngrx/store';
import * as EmployeesActions from './employees.actions';

export const employeesFeatureKey = 'employees';

export interface State {
  employees: any,
  loading: boolean,
  error: string
}

export const initialState: State = {
  employees: [],
  loading: false,
  error:""
};

export const reducer = createReducer(
  initialState,
  on(EmployeesActions.getEmployeesStart, (state, payload) => {
    return {...state,loading: true,error:""}
  }),on(EmployeesActions.getEmployeesSuccess, (state, payload) => {
    return {...state,loading: false,error:"",employees: payload.employees}
  }),on(EmployeesActions.getEmployeesFailure, (state, payload) => {
    return {...state,loading: false,error:payload.error.message}
  })
);

