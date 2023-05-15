import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
    constructor(private router: Router) { }

  ngOnInit() {
    if (window.location.pathname === "/") {
      this.router.navigate(['/onboarding-application']);
    }
  
}
}
