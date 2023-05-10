import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import * as ApplicationsActions from "../../../store/applications/applications.actions"
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent {
  state:Observable<any>
  form!: UntypedFormGroup;
    
  constructor(private fb: UntypedFormBuilder, private store: Store<AppState>, private snackBar: MatSnackBar,) {
    this.form =this.fb.group({email:['', [Validators.required, Validators.email]],name:['', [Validators.required]]});
    this.state = this.store.pipe(select("applications"))
    this.state.subscribe((data) => {
      console.log(data)
      if (data.error) {
        this.snackBar.open("Something went wrong. Please try again.", 'Close', { duration: 3000 });
      }
      
    });
  }
  ngOnInit() {
    this.store.dispatch(ApplicationsActions.getApplicationsStart({status:"pending"}))
  }
  sendEmail() {
    console.log(this.form.value)
  }
  onToggleChange(event:any) {
    console.log(event.value);
  }
}
