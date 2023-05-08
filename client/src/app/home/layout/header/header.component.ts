import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {Store,select} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { Logout } from "../../../store/auth/logout.actions"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
state: Observable<any>
  constructor( private store: Store<AppState>,private router: Router ) {
    this.state = this.store.pipe(select("user"))
  }
  logout() {
    localStorage.removeItem("token")
    this.store.dispatch(Logout())
    this.router.navigate(['/login'])
}
}
