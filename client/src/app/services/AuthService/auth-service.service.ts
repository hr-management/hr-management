import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post<any>('/api/auth/user/login', body, {
      observe: 'response',
    });
  }

  getInfo(): Observable<HttpResponse<any>> {
    return this.http.get<any>('/api/auth/user/info', {
      observe: 'response',
    });
  }

  updateStatus(params: Record<string, unknown>): Observable<HttpResponse<any>> {
    return this.http.put<any>('/api/user/onboarding/status', params, {
      observe: 'response',
    });
  }
  
  updateUserInfo(
    params: Record<string, unknown>
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>('/api/auth/user/info', params, {
      observe: 'response',
    });
  }

  updateUserVisa(
    params: Record<string, unknown>
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>('/api/user/visa/upload', params, {
      observe: 'response',
    });
  }
}
