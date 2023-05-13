// housing.actions.ts

import { createAction, props } from '@ngrx/store';
import { Housing } from './housing.state';

export const loadHouses = createAction('[Housing] Load Houses');

export const loadHousesSuccess = createAction(
  '[Housing] Load Houses Success',
  props<{ houses: Housing[] }>()
);

export const addReport = createAction(
  '[Housing] Add Report',
  props<{ houseId: string | null, report: any }>()
);

export const addReportSuccess = createAction(
  '[Housing] Add Report Success',
  props<{ report: any }>()
);

export const addComment = createAction(
  '[Housing] Add Comment',
  props<{ houseId: string, reportId: string, comment: any }>()
);

export const addCommentSuccess = createAction(
  '[Housing] Add Comment Success',
  props<{ comment: any }>()
);

export const deleteHouse = createAction(
    '[Housing] Delete House',
    props<{ houseId: string }>() // Add houseId property
  );
  
  export const deleteHouseSuccess = createAction(
    '[Housing] Delete House Success',
    props<{ houseId: string }>() // Add houseId property
  );
  