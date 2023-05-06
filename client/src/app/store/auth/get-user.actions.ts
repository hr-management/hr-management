import { createAction, props } from '@ngrx/store';

export const GetUsersStart = createAction(
  '[GetUser] Get Users Start'
);

export const GetUsersSuccess = createAction(
  '[GetUser] Get Users Success',
  props<{ user: any }>()
);

export const GetUsersFailure = createAction(
  '[GetUser] Get Users Failure',
  props<{ error: any }>()
);
