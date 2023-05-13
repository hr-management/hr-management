import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {}

@Component({
  selector: 'app-confirm-dailog',
  templateUrl: './confirm-dailog.component.html',
})
export class ConfirmDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
