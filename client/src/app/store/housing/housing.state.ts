// src/app/store/housing/housing.state.ts

import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface Roommate {
  preferredName: string;
  legalFullName: string;
  phoneNumber: string;
  email: string;
  carInformation: string;
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

export interface HousingState extends EntityState<Housing> {
  houses: Housing[];
  selectedHousingId: string | null;
}

export const adapter = createEntityAdapter<Housing>({
  selectId: (housing: Housing) => housing._id,
});

export const initialState: HousingState = adapter.getInitialState({
  houses: [],
  selectedHousingId: null,
});
