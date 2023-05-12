import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as VisaEmployeesActions from './visa-employees.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class GetVisaEmployeesEffects {


    constructor(private actions$: Actions, private http: HttpClient) { }

  getVisaEmployees$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(VisaEmployeesActions.getVisaEmployeesStart),
    switchMap((action) => {    
      const { status, search } = action;
      return this.http.get<any>(`/api/employees/visaEmployees/${status}?search=${search}`,).pipe(
        map((data) => {
          return VisaEmployeesActions.getVisaEmployeesSuccess({data})
        }),
        catchError((err: HttpErrorResponse) => of(VisaEmployeesActions.getVisaEmployeesFailure(err)))
      );
    })
  );
  });
}
