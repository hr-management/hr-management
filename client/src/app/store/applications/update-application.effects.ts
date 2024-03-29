import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as ApplicationsActions from './applications.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {  Router } from '@angular/router';


@Injectable()
export class UpdateApplicationEffects {


  constructor(private actions$: Actions, private http: HttpClient,private router: Router) { }
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
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.router.navigate(['/login']);
            localStorage.removeItem('token')
          }
          return of(ApplicationsActions.updateApplicationsFailure(err))
        })
      );
    })
  );
  });
}
