// src/app/store/housing/housing.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as HousingActions from './housing.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const housingFeatureKey = 'housing';

export interface Roommate {
  preferredName: string;
  legalFullName: string;
  phoneNumber: string;
  email: string;
}

export interface Comment {
  description: string;
  createdBy: string;  // Should be User type
  timestamp: Date;
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  createdBy: string; // Should be User type
  timestamp: Date;
  status: 'Open' | 'In Progress' | 'Closed';
  comments: Comment[];
}

export interface Housing {
  _id: string;
  address: string;
  landlord: {
    legalFullName: string;
    phoneNumber: string;
    email: string;
  };
  roommates: Roommate[];
  facility: {
    beds: number;
    mattresses: number;
    tables: number;
    chairs: number;
  };
  reports: Report[];
}

export interface State extends EntityState<Housing> {
  houses: Housing[];
  selectedHousingId: string | null;
}

export const adapter = createEntityAdapter<Housing>({
  selectId: (housing: Housing) => housing._id,
});

export const initialState: State = adapter.getInitialState({
  houses: [],
  selectedHousingId: null,
});

export const housingReducer = createReducer(
  initialState,

  on(HousingActions.loadHousesSuccess, (state, action) => {
    console.log('Housing State:', state); // Log the current state

    return { ...state, ...action.houses }; // Update the houses property
  }),

  on(HousingActions.addReportSuccess, (state, action) => {
    return {
      ...state,
      houses: state.houses.map((house: Housing) => {
        if (house._id === action.report.houseId) {
          house.reports.push(action.report);
        }
        return house;
      })
    };
  }),

  on(HousingActions.addCommentSuccess, (state, action) => {
    return {
      ...state,
      houses: state.houses.map((house: Housing) => {
        if (house._id === action.comment.houseId) {
          house.reports = house.reports.map((report: Report) => {
            if (report._id === action.comment.reportId) {
              report.comments.push(action.comment);
            }
            return report;
          });
        }
        return house;
      })
    };
  }),

  on(HousingActions.deleteHouse, (state, action) => {
    return {
      ...state,
      houses: state.houses.filter((house: Housing) => house._id !== action.houseId)
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return housingReducer(state, action);
}

