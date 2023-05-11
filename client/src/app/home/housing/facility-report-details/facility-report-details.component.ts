import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facility-report-details',
  templateUrl: './facility-report-details.component.html',
  styleUrls: ['./facility-report-details.component.scss']
})
export class FacilityReportDetailsComponent implements OnInit {
  report!: {
    _id: string;
    title: string;
    description: string;
    createdBy: string;
    timestamp: Date;
    status: string;
    comments: Array<{
      description: string;
      createdBy: string;
      timestamp: Date;
    }>;
  };
  newCommentDescription!: string;
  newCommentCreatedBy!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // const reportId = this.route.snapshot.paramMap.get('reportId');
    // // Make an HTTP GET request to the /api/housing/facility-reports/:reportId endpoint
    // this.http.get<{
    //   _id: string,
    //   title: string,
    //   description: string,
    //   createdBy: string,
    //   timestamp: Date,
    //   status: string,
    //   comments: Array<{
    //     description: string,
    //     createdBy: string,
    //     timestamp: Date
    //   }>
    // }>(`/api/housing/facility-reports/${reportId}`).subscribe((data) => {
    //   this.report = data;
    // });
  }

  addComment(): void {
    // Make an HTTP POST request to the /api/housing/facility-reports/:reportId/comments endpoint to add a new comment
    const reportId = this.route.snapshot.paramMap.get('reportId');
    const comment = {
      description: this.newCommentDescription,
      createdBy: this.newCommentCreatedBy
    };
    this.http.post<{ description: string, createdBy: string }>(`/api/housing/facility-reports/${reportId}/comments`, comment).subscribe((data) => {
      this.report.comments.push({
        description: data.description,
        createdBy: data.createdBy,
        timestamp: new Date()
      });
      // Reset the form inputs
      this.newCommentDescription = '';
      this.newCommentCreatedBy = '';
    });
  }
}
