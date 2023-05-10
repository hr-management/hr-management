import { createReducer, on } from '@ngrx/store';
import * as ApplicationsActions from './applications.actions';

export const applicationsFeatureKey = 'applications';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

