import { createReducer, on } from '@ngrx/store';
import * as ApplicationsActions from './applications.actions';

export const applicationsFeatureKey = 'applications';

export interface State {
  applications: any[],
  loading: boolean,
  applicationType:string,
  error: string,
}

export const initialState: State = {
  applications: [],
  applicationType:"",
  loading: false,
  error: "",
};

export const reducer = createReducer(
  initialState,
  on(ApplicationsActions.getApplicationsStart, (state, payload) => {
    return { ...state, loading: true,error:""}
  }),
  on(ApplicationsActions.getApplicationsSuccess, (state, payload) => {
    return { ...state, loading: false, applicationType:payload.data.applicationType,applications:payload.data.applications }
  }),
  on(ApplicationsActions.getApplicationsFailure, (state, payload) => {
    return { ...state, loading: false,error:payload.error.message }
  }),
  on(ApplicationsActions.updateApplicationsStart, (state, payload) => {
    return { ...state, loading: true,error:"" }
  }),
  on(ApplicationsActions.updateApplicationsSuccess, (state, payload) => {
    return {
      ...state, loading: false, applications: state.applications.filter((a) => 
    a._id !== payload.id)  }
  }),
  on(ApplicationsActions.updateApplicationsFailure, (state, payload) => {
    return { ...state, loading: false,error:payload.error.message }
  }),

);

