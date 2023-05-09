import { createAction, props } from '@ngrx/store';

export const SignupsStart = createAction(
  '[Signup]  Signups Start',
  props<{ payload: { username: string, password: string, email: string,} }>() 
);

export const SignupsSuccess = createAction(
  '[Signup]  Signups Success',

);

export const SignupsFailure = createAction(
  '[Signup]  Signups Failure',
  props<{ error: any }>()
);
