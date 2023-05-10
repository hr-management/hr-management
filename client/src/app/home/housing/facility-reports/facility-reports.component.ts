import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facility-reports',
  templateUrl: './facility-reports.component.html',
  styleUrls: ['./facility-reports.component.css']
})
export class FacilityReportsComponent implements OnInit {
  reports!: Array<{ _id: string, title: string, status: string, createdBy: string, timestamp: Date }>;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Make an HTTP GET request to the /api/housing/facility-reports endpoint
    this.http.get<Array<{ _id: string, title: string, status: string, createdBy: string, timestamp: Date }>>('/api/housing/facility-reports').subscribe((data) => {
      this.reports = data;
    });
  }

  viewReport(reportId: string): void {
    // Navigate to the FacilityReportDetailsComponent for the selected report
    this.router.navigate(['/facility-reports', reportId]);
  }
}
