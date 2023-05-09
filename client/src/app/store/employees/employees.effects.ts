import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as EmployeesAction from './employees.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class EmployeesEffects {

  constructor(private actions$: Actions, private http: HttpClient) { }

  getUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(EmployeesAction.getEmployeesStart),
    switchMap(() => {    
      return this.http.get<any>('/api/employees/',).pipe(
        map((data:any) => {
          return EmployeesAction.getEmployeesSuccess(data)
        }),
        catchError((err: HttpErrorResponse) => of(EmployeesAction.getEmployeesFailure(err)))
      );
    })
  );
  });
}
