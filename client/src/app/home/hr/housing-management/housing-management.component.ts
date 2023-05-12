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
  newHouse: any = {
    address: "",
    landlord: {
      legalFullName: "",
      phoneNumber: "",
      email: "",
    },
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchHouses();
  }

  // houses: any[] = []; // Define houses as an array of objects

  fetchHouses() {
    const apiUrl = 'http://localhost:3001/api/housing/';

    this.http.get<any[]>(apiUrl).subscribe(
      (houses: any[]) => {
        this.houses = houses;
      },
      (error) => {
        console.log('Error occurred while fetching houses:', error);
      }
    );
  }


  addHouse() {
    const apiUrl = 'http://localhost:3001/api/housing/';
  
    this.http.post<any>(apiUrl, this.newHouse).subscribe(
      house => {
        this.houses.push(house);
        this.newHouse = {
          address: "",
          landlord: {
            legalFullName: "",
            phoneNumber: "",
            email: "",
          },
        };
      },
      error => {
        console.log('Error adding house:', error);
      }
    );
  }
  

  deleteHouse(houseId: string) {
    this.http.delete(`http://localhost:3001/api/housing/${houseId}`).subscribe(
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
