import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  // styleUrls: ['./housing-details.component.css']
})
export class HousingDetailsComponent implements OnInit {
  address!: string;
  roommates!: Array<{ name: string; phone: string; }>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Make an HTTP GET request to the /api/housing/house-details endpoint
    // this.http.get<{ address: string, roommates: Array<{ name: string, phone: string }> }>('/api/housing/house-details').subscribe((data) => {
    //   this.address = data.address;
    //   this.roommates = data.roommates;
    // });
  }
}
