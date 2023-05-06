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

