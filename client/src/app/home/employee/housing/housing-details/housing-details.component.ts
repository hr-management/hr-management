import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
// import jwt_decode from 'jwt-decode';
import { PageEvent } from '@angular/material/paginator';

interface DecodedToken {
  userId: string;
  // other properties of your token...
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

interface Report {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  timestamp: Date;
  status: string;
  comments: Comment[];
}

interface Facility {
  beds: number;
  mattresses: number;
  tables: number;
  chairs: number;
}

interface Comment {
  description: string;
  createdBy: string;
  timestamp: Date;
}

interface House {
  _id: string;
  address: string;
  landlord: Landlord;
  roommates: Roommate[];
  facility: Facility;
  reports: Report[];
}

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.scss']
})
export class HousingDetailsComponent implements OnInit {
  address!: string;
  roommates!: Array<Roommate>;
  reports!: Array<Report>;
  userId: any;
  houseId: any;
  username: any;
  house: House | null = null;
  selectedReport: Report | null = null; // Variable to track the selected report


  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.getHouseData();
  }

  getHousingDetails(houseId: string) {
    this.http.get(`http://localhost:3001/api/housing/${houseId}`).subscribe((response: any) => {
      this.address = response.address;
      this.roommates = response.roommates;
      this.reports = response.reports;
    }, error => {
      console.error('Failed to fetch house details:', error);
    });
  }

  getHouseData() {
    this.authService.getInfo().subscribe((response: any) => {
      const userData = response.body; // This is assuming the response includes the 'body' property.
      this.houseId = userData.user.assignedHouse._id;
      this.username = userData.user.username;
      this.getHousingDetails(this.houseId);
    }, error => {
      console.error('Failed to fetch user info:', error);
    });
  }

  createReport(title: string, description: string) {
    this.http.post(`http://localhost:3001/api/housing/${this.houseId}/report`, { title, description }).subscribe(response => {
      // If the report creation was successful, refresh the housing details to include the new report.
      this.getHousingDetails(this.houseId);
    }, error => {
      console.error('Failed to create report:', error);
    });
  }

  addComment(reportId: string, comment: string) {
    const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments`;

    const token = localStorage.getItem('token'); // replace 'token' with your token key
    if (!token) {
      console.error('No token found');
      return;
    }

    const decodedToken = jwt_decode(token) as DecodedToken;
    const createdBy = decodedToken.userId;
    console.log(decodedToken)

    this.http.get<any>(apiUrl).subscribe(
      (house: any) => {
        console.log(house)
        this.house = house;
      },
      (error) => {
        console.log('Error occurred while fetching house details:', error);
      }
    );

    this.http.post(apiUrl, { description: comment, createdBy }).subscribe(
      () => {
        this.getHousingDetails(this.houseId);
        this.openReport(reportId); // Open the report section after adding the comment
      },
      (error) => {
        console.log('Error occurred while adding comment:', error);
      }
    );
  }

  openReport(reportId: string) {
    this.selectedReport = this.reports.find(report => report._id === reportId) || null;
  }

  closeReport() {
    this.selectedReport = null;
  }
}
