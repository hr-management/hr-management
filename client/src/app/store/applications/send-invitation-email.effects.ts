import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import * as ApplicationsActions from './applications.actions';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';




@Injectable()
export class SendInvitationEmailEffects {


   constructor(private actions$: Actions, private http: HttpClient) { }
  sendInvitationEmail$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(ApplicationsActions.sendInvitationEmailStart),
    switchMap((action) => {    
      const {email,name} = action;
      return this.http.post<any>(`/api/employees/invitation`,{email,name}).pipe(
        map((data) => {
          return ApplicationsActions.sendInvitationEmailSuccess({message:data.message})
        }),
        catchError((err: HttpErrorResponse) => of(ApplicationsActions.sendInvitationEmailFailure(err)))
      );
    })
  );
  });
}
