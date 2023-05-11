import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as ApplicationsActions from './applications.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class GetApplicationsEffects {


  constructor(private actions$: Actions, private http: HttpClient) { }

  getApplications$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(ApplicationsActions.getApplicationsStart),
    switchMap((action) => {    
      const status = action.status;
      return this.http.get<any>(`/api/employees/applications/${status}`,).pipe(
        map((data) => {
          return ApplicationsActions.getApplicationsSuccess({data})
        }),
        catchError((err: HttpErrorResponse) => of(ApplicationsActions.getApplicationsFailure(err)))
      );
    })
  );
  });
}
