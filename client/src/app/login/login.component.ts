import { AuthService } from './../services/AuthService/auth-service.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  login() {
    this.http.post('/api/auth/user/login', { username: this.username, password: this.password })
    .subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        console.log(response.token);
        // Redirect 
      },
      (error: any) => {
        console.error(error);
        this.snackBar.open('Invalid username or password', 'Close', { duration: 3000 });
      }
    );
  }
}