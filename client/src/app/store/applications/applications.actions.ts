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
