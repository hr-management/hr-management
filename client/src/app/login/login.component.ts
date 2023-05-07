import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import * as LoginAction from '../store/auth/login.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   state:Observable<any>
  username: string = '';
  password: string = '';
 


  constructor( private snackBar: MatSnackBar,  private store: Store<AppState>) {
    this.state = this.store.pipe(select("user"))
    this.state.subscribe((data) => {
      // console.log(data)
      if (data.error) {
        this.snackBar.open(data.error, 'Close', { duration: 3000 });
      }
    });
  }

  login() {
    if (this.username && this.password) {
          this.store.dispatch(LoginAction.LoginsStart({ payload:{username: this.username, password: this.password }}))

    }
  }
  
}