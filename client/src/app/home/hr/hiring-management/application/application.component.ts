import {Component, Inject,Output,EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog-component/confirmation-dialog.component';
import { MatDialog,MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  hideUplodProfile: boolean = true
  feedback: string = ''
  @Output() closeParentDialog = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { 
  }
 
  openConfirmationDialog(result:string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // prevent user from closing the dialog by clicking outside of it
    dialogConfig.autoFocus = true;
    if (result === "approve") {
      dialogConfig.data = {data:this.data,message:'Are you sure you want to approve this application?',action:"approve"} 
    } else {
       dialogConfig.data = {data:this.data,message:'Are you sure you want to reject this application?',action:"reject",feedback:this.feedback} 
    }
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.closeParentDialog.emit();
    })
}

}
