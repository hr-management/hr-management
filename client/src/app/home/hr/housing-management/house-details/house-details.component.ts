// house-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent implements OnInit {
  houseId!: string;
  house: any;

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

  newComment: { [reportId: string]: string } = {};

  addComment(reportId: string, comment: string) {
    // Make a POST request to add the comment
    const apiUrl = `http://localhost:3001/api/reports/${reportId}/comments`;
    this.http.post(apiUrl, { comment }).subscribe(
      () => {
        // Fetch the house details again to update the comments
        this.fetchHouseDetails();
      },
      (error) => {
        console.log('Error occurred while adding comment:', error);
      }
    );
  }

}
