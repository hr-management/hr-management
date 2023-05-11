import { createAction, props } from '@ngrx/store';

export const getVisaEmployeesStart = createAction(
  '[VisaEmployees] Get VisaEmployees Start'
);

export const getVisaEmployeesSuccess = createAction(
  '[VisaEmployees] Get VisaEmployees Success',
  props<{ data: any }>()
);

export const getVisaEmployeesFailure = createAction(
  '[VisaEmployees] Get VisaEmployees Failure',
  props<{ error: any }>()
);
