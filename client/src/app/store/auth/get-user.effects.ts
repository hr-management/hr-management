import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as GetUserAction from './get-user.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class GetUserEffects {


  constructor(private actions$: Actions, private http: HttpClient) { }

  getUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(GetUserAction.GetUsersStart),
    switchMap(() => {    
      return this.http.get<any>('/api/auth/user/info',).pipe(
        map((userData) => {
          return GetUserAction.GetUsersSuccess(userData)
        }),
        catchError((err: HttpErrorResponse) => of(GetUserAction.GetUsersFailure(err)))
      );
    })
  );
  });
}
