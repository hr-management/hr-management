import { createAction, props } from '@ngrx/store';

export const loadLoginsStart = createAction(
  '[Login] Load Logins start',props<{ payload:{username: string, password: string }}>()
);

export const loadLoginsSuccess = createAction(
  '[Login] Load Logins Success',
  props<{ data: any }>()
);

export const loadLoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);

