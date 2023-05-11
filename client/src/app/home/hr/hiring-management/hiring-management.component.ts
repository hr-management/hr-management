import { Component,ChangeDetectionStrategy   } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import * as ApplicationsActions from "../../../store/applications/applications.actions"
import {select, Store } from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef,MatDialogConfig } from '@angular/material/dialog' ;
import { ApplicationComponent } from "./application/application.component"

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class HiringManagementComponent {
  state:Observable<any>
  form!: UntypedFormGroup;
  displayedColumns: string[] = ['fullName', 'email', 'action',]; 
 
  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.form =this.fb.group({email:['', [Validators.required, Validators.email]],name:['', [Validators.required]]});
    this.state = this.store.pipe(select("applications"))
    this.state.subscribe((data) => {
      if (data.error) {
        this.snackBar.open("Something went wrong. Please try again.", 'Close', { duration: 3000 });
      }
      
    });
  }
  ngOnInit() {
    this.store.dispatch(ApplicationsActions.getApplicationsStart({ status: "pending" }))
   
  }
  sendEmail() {
    console.log(this.form.value)
  }
  onToggleChange(event:any) {
    this.store.dispatch(ApplicationsActions.getApplicationsStart({status:event.value}))
  }
  openDialog(application: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.data = application
    dialogConfig.autoFocus=false;
    const dialogRef = this.dialog.open(ApplicationComponent,dialogConfig);
    dialogRef.componentInstance.closeParentDialog.subscribe(() => {
      dialogRef.close();
      
    })
  }

}

