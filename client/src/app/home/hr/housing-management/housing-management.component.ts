// housing-management.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {
  houses: any[] = [];
  newHouse: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getHouses();
  }

  getHouses() {
    this.http.get<any[]>('/api/housing').subscribe(
      houses => {
        this.houses = houses;
      },
      error => {
        console.log('Error fetching houses:', error);
      }
    );
  }

  addHouse() {
    this.http.post<any>('/api/housing', this.newHouse).subscribe(
      house => {
        this.houses.push(house);
        this.newHouse = {};
      },
      error => {
        console.log('Error adding house:', error);
      }
    );
  }

  deleteHouse(houseId: string) {
    this.http.delete(`/api/housing/${houseId}`).subscribe(
      () => {
        this.houses = this.houses.filter(house => house._id !== houseId
        );
      },
      error => {
        console.log('Error deleting house:', error);
      }
    );
  }

  viewHouseDetails(houseId: string) {
    // Navigate to the house details page by appending the houseId to the URL
    this.router.navigate(['/house-details', houseId]);
  }

}
