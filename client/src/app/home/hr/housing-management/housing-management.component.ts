import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingHrService, House, Report } from '../../../services/housingManagementService/housing-hr.service';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {
  houses: any[] = [];
  newHouse: any = {
    address: '',
    landlord: {
      legalFullName: '',
      phoneNumber: '',
      email: '',
    },
    facility: {
      beds: 0,
      mattresses: 0,
      tables: 0,
      chairs: 0,
    }
  };

  constructor(
    private housingManagementService: HousingHrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchHouses();
  }

  fetchHouses() {
    this.housingManagementService.fetchHouses().subscribe(
      (houses: any[]) => {
        this.houses = houses;
      },
      (error) => {
        console.log('Error occurred while fetching houses:', error);
      }
    );
  }

  addHouse() {
    this.housingManagementService.addHouse(this.newHouse).subscribe(
      (house: any) => {
        this.houses.push(house);
        this.newHouse = {
          address: '',
          landlord: {
            legalFullName: '',
            phoneNumber: '',
            email: '',
          },
          facility: {
            beds: 0,
            mattresses: 0,
            tables: 0,
            chairs: 0,
          }
        };
      },
      (error) => {
        console.log('Error adding house:', error);
      }
    );
  }

  deleteHouse(houseId: string) {
    this.housingManagementService.deleteHouse(houseId).subscribe(
      () => {
        this.houses = this.houses.filter(house => house._id !== houseId);
      },
      error => {
        console.log('Error deleting house:', error);
      }
    );
  }

  viewHouseDetails(houseId: string) {
    this.router.navigate(['/house-details', houseId]);
  }
}

// // housing-management.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { HousingState, Housing } from '../../../store/housing/housing.state';
// import * as HousingActions from '../../../store/housing/housing.actions';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-housing-management',
//   templateUrl: './housing-management.component.html',
//   styleUrls: ['./housing-management.component.scss']
// })
// export class HousingManagementComponent implements OnInit {
//   newHouse: any = {
//     address: '',
//     landlord: {
//       legalFullName: '',
//       phoneNumber: '',
//       email: '',
//     },
//   };

//   houses$!: Observable<Housing[]>;

//   constructor(private store: Store<{ housing: HousingState }>, private router: Router) { }

//   ngOnInit() {
//     this.store.dispatch(HousingActions.loadHouses());
//     this.houses$ = this.store.pipe(
//       select((state) => state.housing.houses)
//     );
//   }

//   addHouse() {
//     this.store.dispatch(HousingActions.addReport({ houseId: null, report: this.newHouse }));
//     this.newHouse = {
//       address: '',
//       landlord: {
//         legalFullName: '',
//         phoneNumber: '',
//         email: '',
//       },
//     };
//     console.log(this.houses$);
//   }

//   deleteHouse(houseId: string | null) {
//     if (houseId) {
//       this.store.dispatch(HousingActions.deleteHouse({ houseId }));
//     }
//   }

//   viewHouseDetails(houseId: string) {
//     // Navigate to the house details page by appending the houseId to the URL
//     this.router.navigate(['/house-details', houseId]);
//   }
// }