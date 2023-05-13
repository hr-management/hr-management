import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators"
import { Subject, of, catchError,combineLatest} from 'rxjs';
import * as SignupActions from '../store/auth/signup.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  state:Observable<any>
  sigupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl({value:"",disabled: true}, [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  loading: boolean = true
  password$ = new Subject<any>();
  confirmPassword$ = new Subject<any>();

  passwordMismatch$: Observable<string> = combineLatest([this.password$, this.confirmPassword$]).pipe(
    map(([password, confirmPassword]) => {      
      return password.value === confirmPassword.value ? '' : 'Passwords do not match';
    })
  );

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
     
     if (!token) { this.loading = false}
    this.http.get<any>('/api/employees/newApplicationInfo',{headers: new HttpHeaders({
    'Content-Type':  'application/json',
   'Authorization': `Bearer ${token}`
  })}).pipe(
    map((userData) => {
     this.sigupForm.controls['email'].setValue(userData.user);
          
        }),
        catchError((err: HttpErrorResponse) => of(err))
    ).subscribe(() => {
      this.loading = false
    });
   });
    this.passwordMismatch$.subscribe(errorMessage => {
      const confirmPasswordControl = this.sigupForm.get('confirmPassword');
      if (confirmPasswordControl) {if (errorMessage) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
      } }
       
    })
  }
  signup() {    
    if (this.sigupForm.valid) {
      const username = this.sigupForm.value.username as string;
      const password = this.sigupForm.value.password as string;
      const email = this.sigupForm.get('email')?.value as string;
      this.store.dispatch(SignupActions.SignupsStart({ payload:{username, password,email}}))
    }
  }
}
