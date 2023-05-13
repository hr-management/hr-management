import {Component, Inject, } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import * as VisaEmployeesActions from "../../../../store/visaEmployees/visa-employees.actions"
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
    updateVisaAuthDoc$ = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: any, message: string, action: string },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private store: Store<AppState>,
    private snackBar: MatSnackBar

  ) { 
    this.state = this.store.pipe(select("visaEmployees"))
    this.state.subscribe((data) => {
      // close dialog if update is successful
      if(data.visaEmployees.length){
        const cur = data.visaEmployees.find((a: any) => a._id === this.data.data.id)
        if (this.data.action === "reject") {
            if (cur?.workAuthDoc.at(-1).status === "rejected") {
            this.dialogRef.close()
          }
        } else {
          if ((cur?.workAuthDoc.length===4 && cur?.workAuthDoc.at(-1).status === "approved") || (cur?.workAuthDoc.at(-1).status === "notSubmitted") ) {
            this.dialogRef.close()
          }
        }      
    }
      if (data.error) {
        this.snackBar.open("Something went wrong. Please try again.", 'Close', { duration: 3000 });
      }
      
    });
  }
  ngOnInit() {
    this.updateVisaAuthDoc$.pipe(throttleTime(2000)).subscribe((status: any) => {
        this.store.dispatch(VisaEmployeesActions.updateVisaAuthDocStart({id:this.data.data.id,status,feedback:this.feedback}))
     })
}
  
}
