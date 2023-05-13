import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as VisaEmployeesActions from './visa-employees.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {  Router } from '@angular/router';



@Injectable()
export class UpdateVisaAuthDocEffects {
  constructor(private actions$: Actions, private http: HttpClient,private router: Router) { }
  updateVisaAuthDoc$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(VisaEmployeesActions.updateVisaAuthDocStart),
    switchMap((action) => {    
      const { id, status, feedback } = action;
      console.log(action)
      return this.http.put<any>(`/api/employees/visaEmployees/${id}/workAuthStatus`,{status,feedback}).pipe(
        map((data) => {
          console.log(data)
          return VisaEmployeesActions.updateVisaAuthDocSuccess({id,workAuthDoc:data.workAuthDoc,OPTCompleted:data.OPTCompleted})
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.router.navigate(['/login']);
            localStorage.removeItem('token')
          }
          return of(VisaEmployeesActions.updateVisaAuthDocFailure(err))
        }
          )
      );
    })
  );
  });
}
