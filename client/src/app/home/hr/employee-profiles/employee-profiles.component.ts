import { Component} from '@angular/core';
import * as EmployeesActions from "../../../store/employees/employees.actions"
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.scss']
})
  
export class EmployeeProfilesComponent   {
   state:Observable<any>
  displayedColumns: string[] = ['name', 'ssn', 'workAuthTitle', 'workPhoneNumber','email', ];
  
  constructor(private snackBar: MatSnackBar, private store: Store<AppState>) {
    this.state = this.store.pipe(select("employees"))
    this.state.subscribe((data) => {
      console.log(data)
      if (data.error) {
        this.snackBar.open("Something went wrong. Please try again.", 'Close', { duration: 3000 });
      }
      
    });

  }
  ngOnInit() {
  this.store.dispatch(EmployeesActions.getEmployeesStart())
  }
   
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
