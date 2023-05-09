import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as SignupActions from './signup.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError,tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()
export class SignupEffects {


  constructor(private actions$: Actions, private http: HttpClient,private router: Router) { }
  
  signupUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(SignupActions.SignupsStart),
    switchMap((action) => {    
      const { username, password,email } = action.payload; 
      return this.http.post<any>('/api/auth/user/signup',{ username, password ,email}).pipe(
        map((userData) => {
          localStorage.setItem('token', userData.token);
          return SignupActions.SignupsSuccess()
        }),
        catchError((err: HttpErrorResponse) => of(SignupActions.SignupsFailure(err)))
      );
    })
  );
  });
    signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SignupActions.SignupsSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), { dispatch: false });
}
