import { createAction, props } from '@ngrx/store';

export const getApplicationsStart = createAction(
  '[Applications] Get Applications Start',
  props<{ status: string }>()
);

export const getApplicationsSuccess = createAction(
  '[Applications] Get Applications Success',
  props<{ data: any }>()
);

export const getApplicationsFailure = createAction(
  '[Applications] Get Applications Failure',
  props<{ error: any }>()
);
export const updateApplicationsStart = createAction(
  '[Applications] Update Applications Start',
  props<{ status: string,id:string,feedback:string }>()
);

export const updateApplicationsSuccess = createAction(
  '[Applications] Update Applications Success',
  props<{ id: string,status:string }>()
);

export const updateApplicationsFailure = createAction(
  '[Applications] Update Applications Failure',
  props<{ error: any }>()
);
export const sendInvitationEmailStart = createAction(
  '[Applications] send Invitation Email Start',
  props<{ email: string,name:string }>()
);

export const sendInvitationEmailSuccess = createAction(
  '[Applications] send Invitation Email Success',
  props<{ message:string }>()
);

export const sendInvitationEmailFailure = createAction(
  '[Applications] send Invitation Email Failure',
  props<{ error: any }>()
);