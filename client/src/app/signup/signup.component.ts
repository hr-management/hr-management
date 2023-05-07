import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {map,catchError,of} from "rxjs"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  state:Observable<any>
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = ""
  loading:boolean = true
  constructor( private route: ActivatedRoute,private snackBar: MatSnackBar,  private store: Store<AppState>,private http: HttpClient) {
    this.state = this.store.pipe(select("user"))
    this.state.subscribe((data) => {
      // console.log(data)
      if (data.error) {
        this.snackBar.open(data.error, 'Close', { duration: 3000 });
      }
    });
  }
  ngOnInit() {
   this.route.queryParams.subscribe(params => {
    const token = params['token']; // Get the value of the 'token' query parameter
     
     if (token) {
    this.http.get<any>('/api/employees/newApplicationInfo',{headers: new HttpHeaders({
    'Content-Type':  'application/json',
   'Authorization': `Bearer ${token}`
  })}).pipe(
    map((userData) => {
          this.email = userData.user;
        }),
        catchError((err: HttpErrorResponse) => of(err))
    ).subscribe(() => {
      this.loading = false
    });
  }
   
   });
    
  }
  signup() {
      
     
    // if (this.username && this.password) {
    //       this.store.dispatch(LoginAction.LoginsStart({ payload:{username: this.username, password: this.password }}))

    // }
  }
}
