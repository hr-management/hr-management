import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'user';

export interface State {

}

export const initialState: State = {
  user: {},
  loading: false,
  error: ""
};

export const reducer = createReducer(
  initialState,
  on(LoginActions.LoginsStart, (state, payload) => {
    return { ...state, loading: true,error:"" }
  }),
  on(LoginActions.LoginsSuccess, (state, payload) => {
    return { ...state, loading: false,error:"",user:payload.data }
  }),
  on(LoginActions.LoginsFailure, (state, payload) => {
    return { ...state, loading: false,error:payload.error.message }
  }),
);

