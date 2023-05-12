import { Component,   } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import * as ApplicationsActions from "../../../store/applications/applications.actions"
import {select, Store } from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable,BehaviorSubject  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog' ;
import { ApplicationComponent } from "./application/application.component"
import { SendEmailService } from 'src/app/services/sendEmailService/send-email.service';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss'],

})
export class HiringManagementComponent {
  state:Observable<any>
  form!: UntypedFormGroup;
  displayedColumns: string[] = ['fullName', 'email', 'action',]; 
  sendEmailLoading$ =new BehaviorSubject<boolean>(false);
  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sendEmailService: SendEmailService
  ) {
    this.form =this.fb.group({email:['', [Validators.required, Validators.email]],name:['', [Validators.required]]});
    this.state = this.store.pipe(select("applications"))
    this.state.subscribe((data) => {
      if (data.error) {
        this.snackBar.open(data.error, 'Close', { duration: 3000 });
      }
    })
  }
  ngOnInit() {
    this.store.dispatch(ApplicationsActions.getApplicationsStart({ status: "pending" }))
  }
  sendEmail() {
    if (this.form.valid) {
      this.sendEmailLoading$.next(true)
      this.sendEmailService.sendInvitationEmail(this.form.value).subscribe({
        next: (data) => {
            this.snackBar.open(data.message, 'Close', { duration: 3000 });
            this.form.reset()
            Object.keys(this.form.controls).forEach(key => {
                    this.form.controls[key].setErrors(null);
                    this.form.controls[key].markAsUntouched();
                    this.form.controls[key].markAsPristine();
              });
        },
        error: (err) => {
          this.sendEmailLoading$.next(false);
          this.snackBar.open(err.error.message, 'Close', { duration: 3000 })
          
        },
        complete: () => {
        this.sendEmailLoading$.next(false); // set loading status to false
      }
      })
    }
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

