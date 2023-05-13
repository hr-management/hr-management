import {Component, Inject, } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import * as ApplicationsActions from "../../../../../store/applications/applications.actions"
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable,Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  feedback:string =""
    state:Observable<any>
  updateApplication$ = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: any, message: string, action: string },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private store: Store<AppState>,
    private snackBar: MatSnackBar

  ) { 
    this.state = this.store.pipe(select("applications"))
    this.state.subscribe((data) => {
      const cur = data.applications.find((a: any) => a._id === this.data.data._id)
      if (cur?.applicationStatus !== this.data.data.applicationStatus) {
        this.dialogRef.close()
      }
      if (data.error) {
        this.snackBar.open("Something went wrong. Please try again.", 'Close', { duration: 3000 });
      }
      
    });
  }
  ngOnInit() {
    this.updateApplication$.pipe(throttleTime(2000)).subscribe((status: any) => {
       this.store.dispatch(ApplicationsActions.updateApplicationsStart({id:this.data.data._id,status,feedback:this.feedback}))
     })
}
 
}
