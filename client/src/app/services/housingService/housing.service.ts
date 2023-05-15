import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getHouseDetails(houseId: string): Observable<any> {
    return this.http.get(`http://localhost:3001/api/housing/${houseId}`);
  }

  createReport(reportData: any): Observable<any> {
    const apiUrlReport = `http://localhost:3001/api/housing/facility-reports`;
    return this.http.post(apiUrlReport, reportData);
  }

  addComment(reportId: string, commentData: any): Observable<any> {
    const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments`;
    return this.http.post(apiUrl, commentData);
  }

  updateComment(reportId: string, commentId: string, commentData: any): Observable<any> {
    const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments/${commentId}`;
    return this.http.put(apiUrl, commentData);
  }
}
