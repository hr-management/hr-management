import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as ApplicationsActions from './applications.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class UpdateApplicationEffects {


  constructor(private actions$: Actions, private http: HttpClient) { }
  updateApplication$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(ApplicationsActions.updateApplicationsStart),
    switchMap((action) => {    
      const {id,status,feedback} = action;
      return this.http.put<any>(`/api/employees/${id}/applicationStatus`,{status,feedback}).pipe(
        map((data) => {
          console.log(data)
          return ApplicationsActions.updateApplicationsSuccess({id,status:data.applicationStatus})
        }),
        catchError((err: HttpErrorResponse) => of(ApplicationsActions.updateApplicationsFailure(err)))
      );
    })
  );
  });
}
