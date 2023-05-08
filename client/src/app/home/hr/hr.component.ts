import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent {
  sideBarLinks:any[] =['employee-profiles','visa-status-management','hiring-management','housing-management']
    constructor(private router: Router) { }

  ngOnInit() {
    
    if (window.location.pathname === "/") {
      this.router.navigate(['/employee-profiles']);
    }
  
}
}
