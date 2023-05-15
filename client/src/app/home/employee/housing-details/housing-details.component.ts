import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housingService/housing.service';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';

interface DecodedToken {
  userId: string;
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
  _id: string;
  description: string;
  createdBy: string;
  timestamp: Date;
  isEditing?: boolean; // Add this line
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
  roommates!: Roommate[];
  reports!: Report[];
  houseId: any;
  username: any;
  house: House | null = null;
  selectedReport: Report | null = null;
  editingComments: { [key: string]: boolean } = {};

  constructor(
    private housingDetailsService: HousingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getHouseData();
  }

  getHouseData() {
    this.authService.getInfo().subscribe(
      (response: any) => {
        const userData = response.body;
        this.houseId = userData.user.assignedHouse._id;
        this.username = userData.user.username;
        this.getHousingDetails(this.houseId);
      },
      (error) => {
        console.error('Failed to fetch user info:', error);
      }
    );
  }

  getHousingDetails(houseId: string, reportId?: string) {
    this.housingDetailsService.getHouseDetails(houseId).subscribe(
      (response: any) => {
        this.address = response.address;
        this.roommates = response.roommates;
        this.reports = response.reports;

        if (reportId) {
          this.openReport(reportId);
        }
      },
      (error) => {
        console.error('Failed to fetch house details:', error);
      }
    );
  }

  createReport(title: string, description: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    const decodedToken = jwt_decode(token) as DecodedToken;
    const createdBy = decodedToken.userId;

    this.housingDetailsService.createReport({
      title,
      description,
      createdBy,
      assignedHouse: this.houseId
    }).subscribe(
      () => {
        this.getHousingDetails(this.houseId);
        this.closeReport(); // Close all reports
      },
      (error) => {
        console.log('Error occurred while adding comment:', error);
      }
    );
  }


  addComment(reportId: string, comment: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    const decodedToken = jwt_decode(token) as DecodedToken;
    const createdBy = decodedToken.userId;

    this.housingDetailsService.addComment(reportId, { description: comment, createdBy }).subscribe(
      () => {
        this.getHousingDetails(this.houseId, reportId);
      },
      (error) => {
        console.log('Error occurred while adding comment:', error);
      }
    );
  }

  updateComment(reportId: string, commentId: string, commentText: string) {
    this.housingDetailsService.updateComment(reportId, commentId, {
      description: commentText,
      timestamp: new Date()
    }).subscribe(
      () => {
        this.getHousingDetails(this.houseId);
        this.stopEditing({ _id: commentId } as Comment);
        this.openReport((reportId));
      },
      (error) => {
        console.log('Error occurred while updating comment:', error);
      }
    );
  }

  startEditing(comment: Comment) {
    if (comment._id) {
      this.editingComments[comment._id] = true;
    }
  }

  stopEditing(comment: Comment) {
    if (comment._id) {
      this.editingComments[comment._id] = false;
    }
  }

  openReport(reportId: string) {
    this.selectedReport = this.reports.find((report) => report._id === reportId) || null;
  }

  closeReport() {
    this.selectedReport = null;
  }
}
