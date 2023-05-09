import { createAction, props } from '@ngrx/store';

export const getEmployeesStart = createAction(
  '[Employees] Get Employees'
);

export const getEmployeesSuccess = createAction(
  '[Employees] Get Employees Success',
  props<{ employees: any }>()
);

export const getEmployeesFailure = createAction(
  '[Employees] Get Employees Failure',
  props<{ error: any }>()
);
