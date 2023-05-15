import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
    sideBarLinks:any[] =['onboarding-application','personal-information','assigned-house', 'visa-status']
    constructor(private router: Router) { }

  ngOnInit() {
    if (window.location.pathname === "/") {
      this.router.navigate(['/onboarding-application']);
    }
  
}
}
