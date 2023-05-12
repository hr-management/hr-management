import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

 constructor(private http: HttpClient) {}

  sendInvitationEmail(data:any) {   
    return this.http.post<any>(`/api/employees/invitation`,data);
  }
  sendDocumentNotificationEmail(data: any) {   
    const {id,documentName} = data;
    return this.http.post<any>(`/api/employees/visaEmployees/${id}/sendNotificationEmail`,{documentName});
  }
}
