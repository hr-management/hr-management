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

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          localStorage.setItem('token', token);
          // this.router.navigate(['/api/user/info']);
        } else {
          console.log('No Authorization header found in response');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}