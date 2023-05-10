import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog-component/confirmation-dialog.component';
import { MatDialog,MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  hideUplodProfile:boolean=true
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { 
  }
  ngOnInit() {
    console.log(this.data)
  }
  


  openApproveConfirmationDialog(): void {

        const dialogConfig = new MatDialogConfig();

// set configuration options
    dialogConfig.disableClose = true; // prevent user from closing the dialog by clicking outside of it
    dialogConfig.autoFocus = true;
    dialogConfig.data = {data:this.data,message:'Are you sure you want to approve this application?'} 
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    
  dialogRef.beforeClosed().subscribe(result => {
    if (result) {
      console.log(result)
      // The user clicked the "Yes" button in the confirmation dialog
      // Update the store to reflect the approval
    } else {
      // The user clicked the "No" button in the confirmation dialog
      // Do nothing
    }
  });
}


}
