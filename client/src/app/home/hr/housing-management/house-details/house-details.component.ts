import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
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
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent implements OnInit {
  houseId!: string;
  house: House | null = null;
  newComment: { [reportId: string]: string } = {};
  pageSize = 3;
  pageEvent!: PageEvent;
  sortedReports: Report[] = [];
  sortByLatest = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'];
      this.fetchHouseDetails();
    });
  }

  fetchHouseDetails() {
    const apiUrl = `http://localhost:3001/api/housing/${this.houseId}`;

    this.http.get<any>(apiUrl).subscribe(
      (house: any) => {
        console.log(house)
        this.house = house;
        this.sortReportsByDate(); // Sort reports after fetching house details
      },
      (error) => {
        console.log('Error occurred while fetching house details:', error);
      }
    );
  }

  addComment(reportId: string, comment: string) {
    const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments`;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decodedToken = jwt_decode(token) as DecodedToken;
    const createdBy = decodedToken.userId;

    this.http.post(apiUrl, { description: comment, createdBy }).subscribe(
      () => {
        this.fetchHouseDetails(); 
      },
      (error) => {
        console.log('Error occurred while adding comment:', error);
      }
    );
  }

  get page(): number {
    return this.pageEvent ? this.pageEvent.pageIndex + 1 : 1;
  }

  sortReportsByDate() {
    if (this.house) {
      this.sortedReports = this.house.reports.slice(); 
  
      if (this.sortByLatest) {
        this.sortedReports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      } else {
        this.sortedReports.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      }
    }
  }
  
  toggleSortByLatest() {
    this.sortByLatest = !this.sortByLatest;
    this.sortReportsByDate();
  }
  
}

