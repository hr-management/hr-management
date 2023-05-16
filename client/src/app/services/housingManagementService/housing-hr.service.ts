import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

interface DecodedToken {
  userId: string;
}

export interface House {
  _id: string;
  address: string;
  landlord: Landlord;
  roommates: Roommate[];
  facility: Facility;
  reports: Report[];
}

interface Landlord {
  legalFullName: string;
  phoneNumber: string;
  email: string;
}

interface Roommate {
  _id: string;
  preferredName?: string;
  legalFullName: string;
  phoneNumber: string;
  email: string;
  carInformation?: string;
}

interface Facility {
  beds: number;
  mattresses: number;
  tables: number;
  chairs: number;
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  timestamp: Date;
  status: string;
  comments: Comment[];
}

interface Comment {
  description: string;
  createdBy: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class HousingHrService {
  private apiUrlHr = 'http://localhost:3001/api/housing/';

  constructor(private http: HttpClient) { }

  getHouseDetails(houseId: string): Observable<House> {
    const apiUrl = `http://localhost:3001/api/housing/${houseId}`;
    return this.http.get<any>(apiUrl).pipe(
      map((house: any) => this.convertToHouseModel(house))
    );
  }

  addComment(reportId: string, comment: string): Observable<void> {
    const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments`;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return throwError('No token found');
    }

    const decodedToken = jwt_decode(token) as DecodedToken;
    const createdBy = decodedToken.userId;

    return this.http.post<void>(apiUrl, { description: comment, createdBy });
  }

  fetchHouses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlHr);
  }

  addHouse(newHouse: any): Observable<any> {
    return this.http.post<any>(this.apiUrlHr, newHouse);
  }

  deleteHouse(houseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlHr}${houseId}`);
  }

  // Add this to your HousingHrService
  getUserInfo(userId: string): Observable<any> {
    // console.log('URL: ', `http://localhost:3001/api/user/${userId}`)
    return this.http.get<any>(`http://localhost:3001/api/user/${userId}`);
  }

  private convertToHouseModel(data: any): House {
    const house: House = {
      _id: data._id,
      address: data.address,
      landlord: data.landlord,
      roommates: data.roommates,
      facility: data.facility,
      reports: data.reports
    };
    return house;
  }
}
