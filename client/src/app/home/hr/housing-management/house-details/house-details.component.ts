// house-details.component.ts
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
  pageSize = 1;
  pageEvent!: PageEvent;

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
      },
      (error) => {
        console.log('Error occurred while fetching house details:', error);
      }
    );
  }

  addComment(reportId: string, comment: string) {
    // const createdBy = "609a7a245ef93200158d2b1a";  // replace this with actual user ID
    const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments`;

    const token = localStorage.getItem('token'); // replace 'token' with your token key
    if (!token) {
      console.error('No token found');
      return;
    }

    const decodedToken = jwt_decode(token) as DecodedToken;
    const createdBy = decodedToken.userId;
    console.log(decodedToken)

    // const hrUrl = `http://localhost:3001/api/employees/${createdBy}`;

    // Router.get("/", authorization, HROnly, getAllEmployees);


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
        // Fetch the house details again to update the comments
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


}
