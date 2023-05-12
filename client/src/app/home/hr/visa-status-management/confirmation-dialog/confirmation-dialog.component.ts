import {Component, Inject, } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import * as VisaEmployeesActions from "../../../../store/visaEmployees/visa-employees.actions"
import {select, Store} from "@ngrx/store";
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  feedback:string =""
    state:Observable<any>

  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: any, message: string, action: string },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private store: Store<AppState>,
    private snackBar: MatSnackBar

  ) { 
    this.state = this.store.pipe(select("visaEmployees"))
    this.state.subscribe((data) => {
      
      if(data.visaEmployees.length){
        const cur = data.visaEmployees.find((a: any) => a._id === this.data.data.id)
        if (this.data.action === "reject") {
            if (cur?.workAuthDoc.at(-1).status === "rejected") {
            this.dialogRef.close()
          }
        } else {
          //TODO bug
          if (cur?.workAuthDoc.at(-2).status === "approved"  ) {
            this.dialogRef.close()
          }
        }      
    }
      if (data.error) {
        this.snackBar.open("Something went wrong. Please try again.", 'Close', { duration: 3000 });
      }
      
    });
  }

  updateVisaAuthDoc(status:string) {
        this.store.dispatch(VisaEmployeesActions.updateVisaAuthDocStart({id:this.data.data.id,status,feedback:this.feedback}))
  }
}
