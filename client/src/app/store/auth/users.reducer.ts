import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import * as GetUserAction from './get-user.actions';

export const loginFeatureKey = 'user';

export interface State {
  user: any,
  loading: boolean,
  error:string
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
  on(GetUserAction.GetUsersStart, (state, payload) => {
    return { ...state, loading: true,error:"" }
  }),
  on(GetUserAction.GetUsersSuccess, (state, payload) => {
    return { ...state, loading: false,error:"",user:payload.user }
  }),
  on(GetUserAction.GetUsersFailure, (state, payload) => {
    return { ...state, loading: false,error:payload.error.message }
  }),
);

