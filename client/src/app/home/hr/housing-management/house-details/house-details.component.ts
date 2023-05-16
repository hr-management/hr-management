//house-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { HousingHrService, House, Report } from '../../../../services/housingManagementService/housing-hr.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent implements OnInit {
  houseId!: string;
  house$: Observable<House | null> = of(null);
  newComment: { [reportId: string]: string } = {};
  pageSize = 3;
  pageEvent!: PageEvent;
  sortedReports: Report[] = [];
  sortByLatest = false;

  constructor(
    private route: ActivatedRoute,
    private housingHrService: HousingHrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'];
      this.fetchHouseDetails();
    });
  }


  // Add this to your HouseDetailsComponent
  roommatesInfo: { [key: string]: Observable<any> } = {};

  fetchHouseDetails() {
    this.house$ = this.housingHrService.getHouseDetails(this.houseId);
    this.house$.subscribe((house: House | null) => {
      this.sortReportsByDate();
  
      if (house) {
        this.housingHrService.getUsersByHouseId(house._id).subscribe(
          (roommates: any[]) => {
            house.roommates = roommates;
  
            this.roommatesInfo = {};
  
            house.roommates.forEach((roommate) => {
              console.log('Roommate info: ', roommate);

              this.roommatesInfo[roommate._id] = this.housingHrService.getUserInfo(roommate._id);
            });
  
            console.log('Roommates info: ', this.roommatesInfo);
          },
          (error) => {
            console.error('Error fetching roommates info: ', error);
          }
        );
      }
    });
  }  

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  

  addComment(reportId: string, comment: string) {
    this.housingHrService.addComment(reportId, comment).subscribe(
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
    this.house$.subscribe((house: House | null) => {
      if (house) {
        this.sortedReports = house.reports.slice();

        if (this.sortByLatest) {
          this.sortedReports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        } else {
          this.sortedReports.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        }
      }
    });
  }

  toggleSortByLatest() {
    this.sortByLatest = !this.sortByLatest;
    this.sortReportsByDate();
  }
}


// export class HouseDetailsComponent implements OnInit {
//   houseId!: string;
//   house: House | null = null;
//   newComment: { [reportId: string]: string } = {};
//   pageSize = 3;
//   pageEvent!: PageEvent;
//   sortedReports: Report[] = [];
//   sortByLatest = false;

//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     this.houseId = params['houseId'];
  //     this.fetchHouseDetails();
  //   });
  // }

  // fetchHouseDetails() {
  //   const apiUrl = `http://localhost:3001/api/housing/${this.houseId}`;

  //   this.http.get<any>(apiUrl).subscribe(
  //     (house: any) => {
  //       console.log(house);
  //       this.house = house;
  //       this.sortReportsByDate(); // Sort reports after fetching house details
  //     },
  //     (error) => {
  //       console.log('Error occurred while fetching house details:', error);
  //     }
  //   );
  // }

  // addComment(reportId: string, comment: string) {
  //   const apiUrl = `http://localhost:3001/api/housing/facility-reports/${reportId}/comments`;

  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('No token found');
  //     return;
  //   }

  //   const decodedToken = jwt_decode(token) as DecodedToken;
  //   const createdBy = decodedToken.userId;

  //   this.http.post(apiUrl, { description: comment, createdBy }).subscribe(
  //     () => {
  //       this.fetchHouseDetails();
  //     },
  //     (error) => {
  //       console.log('Error occurred while adding comment:', error);
  //     }
  //   );
  // }

// }
