import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Store,select} from "@ngrx/store";
import { AppState } from 'src/app/store';
@Injectable({
  providedIn: 'root'
})
export class HRRoleGuard implements CanActivate {
    state: Observable<any>
    constructor(private router: Router,private store: Store<AppState>) {
      this.state = this.store.pipe(select("user"))
  }

  canActivate(): boolean {
    const state = this.store.pipe(select("user"));

    state.subscribe(data => {
      if (!data.user._id || data.user.role === 'HR') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });

    return true;
  }
}







