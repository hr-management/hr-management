import { AuthService } from './../services/AuthService/auth-service.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import * as LoginAction from '../store/login/login.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  state:Observable<any>


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, private store: Store<AppState>) {
    this.state = this.store.pipe(select("user"))
    this.state.subscribe((data) => {
      // console.log(data)
      if (data.error) {
        this.snackBar.open(data.error, 'Close', { duration: 3000 });
      }
    });
  }

  login() {
    // this.http.post('/api/auth/user/login', { username: this.username, password: this.password })
    // .subscribe(
    //   (response: any) => {
    //     localStorage.setItem('token', response.token);
    //     console.log(response.token);
    //     // Redirect 
    //   },
    //   (error: any) => {
    //     console.error(error);
    //     this.snackBar.open('Invalid username or password', 'Close', { duration: 3000 });
    //   }
    // );
    this.store.dispatch(LoginAction.loadLoginsStart({ payload:{username: this.username, password: this.password }}))
  }
  ngOnChange() {
    console.log("state", this.state)
  }
}