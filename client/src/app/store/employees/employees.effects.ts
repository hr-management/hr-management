import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as EmployeesAction from './employees.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {  Router } from '@angular/router';



@Injectable()
export class EmployeesEffects {

  constructor(private actions$: Actions, private http: HttpClient,private router: Router) { }

  getUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(EmployeesAction.getEmployeesStart),
    switchMap((action) => {    
      const search = action.search;
      return this.http.get<any>(`/api/employees/?search=${search}`,).pipe(
        map((data:any) => {
          return EmployeesAction.getEmployeesSuccess(data)
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.router.navigate(['/login']);
            localStorage.removeItem('token')
          }
          return of(EmployeesAction.getEmployeesFailure(err))
        })
      );
    })
  );
  });
}
