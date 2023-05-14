import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {
  constructor(private http: HttpClient) { }

  transform(userId: string): Observable<string> {
    return this.http.get<any>(`http://localhost:3001/api/user/${userId}`)
      .pipe(
        map(response => response.user.username),
        catchError(() => {
          return of('Unknown');
        })
      );
  }

}
