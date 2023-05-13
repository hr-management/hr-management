// src/app/store/housing/housing.effetcs.ts
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as HousingActions from './housing.actions';

@Injectable()
export class HousingEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadHouses$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(HousingActions.loadHouses),
      mergeMap(() =>
        this.http.get<any[]>('http://localhost:3001/api/housing/').pipe(
          map((houses) => HousingActions.loadHousesSuccess({ houses })),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );

  addReport$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(HousingActions.addReport),
      mergeMap((action) =>
        this.http
          .post<any>(`http://localhost:3001/api/housing/${action.houseId}/reports`, action.report)
          .pipe(
            map((report) => HousingActions.addReportSuccess({ report })),
            catchError((error) => {
              console.error(error);
              return EMPTY;
            })
          )
      )
    )
  );

  addComment$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(HousingActions.addComment),
      mergeMap((action) =>
        this.http
          .post<any>(
            `http://localhost:3001/api/housing/${action.houseId}/reports/${action.reportId}/comments`,
            action.comment
          )
          .pipe(
            map((comment) => HousingActions.addCommentSuccess({ comment })),
            catchError((error) => {
              console.error(error);
              return EMPTY;
            })
          )
      )
    )
  );
}
