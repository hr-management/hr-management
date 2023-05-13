import { createReducer, on } from '@ngrx/store';
import * as VisaEmployeesActions from './visa-employees.actions';

export const visaEmployeesFeatureKey = 'visaEmployees';

export interface State {
visaEmployees: any[],
  loading: boolean,
  error:string
}

export const initialState: State = {
  visaEmployees: [],
  loading: false,
  error:""
};

export const reducer = createReducer(
  initialState,
  on(VisaEmployeesActions.getVisaEmployeesStart, (state, payload) => {
    return {...state,loading:true,error:"",visaEmployees:[]}
  }),
  on(VisaEmployeesActions.getVisaEmployeesSuccess, (state, payload) => {
    return {...state,loading:false,visaEmployees:payload.data.visaEmployees}
  })
  , on(VisaEmployeesActions.getVisaEmployeesFailure, (state, payload) => {
    return { ...state, loading: false, error: payload.error.message }
  }),
   on(VisaEmployeesActions.updateVisaAuthDocStart, (state, payload) => {
    return {...state,loading:true,error:""}
  }),
  on(VisaEmployeesActions.updateVisaAuthDocSuccess, (state, payload) => {
    const newVisaEmployees = state.visaEmployees.map(e => {
      if (e._id === payload.id) {
        return {...e, workAuthDoc: payload.workAuthDoc,OPTCompleted:payload.OPTCompleted}
      }
      return e
    })
    return {...state,loading:false, visaEmployees:newVisaEmployees}
  })
  , on(VisaEmployeesActions.getVisaEmployeesFailure, (state, payload) => {
    return { ...state, loading: false, error: payload.error.message }
  })
);

