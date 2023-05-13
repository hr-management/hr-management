import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Store,select} from "@ngrx/store";
import { AppState } from 'src/app/store';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HRRoleGuard implements CanActivate {
    state: Observable<any>
    constructor(private router: Router,private store: Store<AppState>) {
      this.state = this.store.pipe(select("user"))
  }

  canActivate(): Observable<boolean> {
    return this.state.pipe(
      map((data:any) => {
        if (data.role === 'hr') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      
    );
  }
}







