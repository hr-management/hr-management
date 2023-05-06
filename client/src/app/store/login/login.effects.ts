import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as LoginActions from './login.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError,tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {


  constructor(private actions$: Actions, private http: HttpClient,private router: Router) { }
  loginUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(LoginActions.LoginsStart),
    switchMap((action) => {    
      const { username, password } = action.payload; 
      return this.http.post<any>('/api/auth/user/login',{ username, password }).pipe(
        map((userData) => {
          localStorage.setItem('token', userData.token);
          return LoginActions.LoginsSuccess(userData)
        }),
        catchError((err: HttpErrorResponse) => of(LoginActions.LoginsFailure(err)))
      );
    })
  );
  });
    loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.LoginsSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), { dispatch: false });
}