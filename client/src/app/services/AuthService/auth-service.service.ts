import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/auth/user/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post<any>(this.baseUrl, body, { observe: 'response' });
  }
}