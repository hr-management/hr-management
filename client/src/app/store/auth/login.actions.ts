import { createAction, props } from '@ngrx/store';

export const LoginsStart = createAction(
  '[Login] Load Logins start',props<{ payload:{username: string, password: string }}>()
);

export const LoginsSuccess = createAction(
  '[Login] Load Logins Success',
  props<{ data: any }>()
);

export const LoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);
export const GetUserStart = createAction(
  '[Login] Load Get User start'
);

export const GetUserSuccess = createAction(
  '[Login] Load Get User Success',
  props<{ data: any }>()
);

export const GetUserFailure = createAction(
  '[Login] Load Get User Failure',
  props<{ error: any }>()
);
