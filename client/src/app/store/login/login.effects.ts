import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as LoginActions from './login.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class LoginEffects {


  constructor(private actions$: Actions, private http: HttpClient) { }
  loginUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(LoginActions.loadLoginsStart),
    switchMap((action) => {    
      const { username, password } = action.payload; 
      return this.http.post<any>('/api/auth/user/login',{ username, password }).pipe(
        map((userData) => {
          localStorage.setItem('token', userData.token);
          return LoginActions.loadLoginsSuccess(userData)
        }),
        catchError((err: HttpErrorResponse) => of(LoginActions.loadLoginsFailure(err)))
      );
    })
  );
});
}