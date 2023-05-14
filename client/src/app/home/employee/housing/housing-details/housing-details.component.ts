import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';

interface DecodedToken {
  userId: string;
  // other properties of your token...
}
@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.scss']
})
export class HousingDetailsComponent implements OnInit {
  address!: string;
  roommates!: Array<{ name: string; phone: string; }>;
  userId: any;
  houseId: any;

  constructor(private http: HttpClient, private authService: AuthService) { }
 
  ngOnInit(): void {
    this.getHouseData();
  }

  getHouseData() {
    this.authService.getInfo().subscribe((response: any) => {
      const userData = response.body; // This is assuming the response includes the 'body' property.
      console.log(userData.user.assignedHouse._id); // Add this line
    }, error => {
      console.error('Failed to fetch user info:', error);
    });
    
  }

}
