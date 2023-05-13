import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as GetUserAction from './get-user.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {  Router } from '@angular/router';


@Injectable()
export class GetUserEffects {


  constructor(private actions$: Actions, private http: HttpClient,private router: Router,) { }

  getUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(GetUserAction.GetUsersStart),
    switchMap(() => {    
      return this.http.get<any>('/api/auth/user/info',).pipe(
        map((userData) => {
          return GetUserAction.GetUsersSuccess(userData)
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.router.navigate(['/login']);
            localStorage.removeItem('token')
          }
          return of(GetUserAction.GetUsersFailure(err))
        })
      );
    })
  );
  });
}
