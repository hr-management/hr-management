import { createAction, props } from '@ngrx/store';

export const getVisaEmployeesStart = createAction(
  '[VisaEmployees] Get VisaEmployees Start',
  props<{ status: string,search:string }>()
);

export const getVisaEmployeesSuccess = createAction(
  '[VisaEmployees] Get VisaEmployees Success',
  props<{ data: any }>()
);

export const getVisaEmployeesFailure = createAction(
  '[VisaEmployees] Get VisaEmployees Failure',
  props<{ error: any }>()
);
export const updateVisaAuthDocStart = createAction(
  '[VisaEmployees] Update VisaAuthDoc Start',
  props<{ status: string,id:string,feedback:string }>()
);

export const updateVisaAuthDocSuccess = createAction(
  '[VisaEmployees] Update VisaAuthDoc Success',
  props<{id:string,workAuthDoc:any[],OPTCompleted:Boolean}>()
);

export const updateVisaAuthDocFailure = createAction(
  '[VisaEmployees] Update VisaAuthDoc Failure',
  props<{ error: any }>()
);