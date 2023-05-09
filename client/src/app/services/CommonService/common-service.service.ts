import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  upload(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<any>('/api/upload', fd, { observe: 'response' });
  }
}
