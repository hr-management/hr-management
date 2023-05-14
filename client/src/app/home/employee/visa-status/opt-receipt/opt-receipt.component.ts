import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { downloadURL } from 'src/app/utils';

@Component({
  selector: 'app-opt-receipt',
  templateUrl: './opt-receipt.component.html',
  styleUrls: ['./opt-receipt.component.scss']
})
export class OptReceiptComponent {
  @Input() workAuthDoc: any[] = [];

  constructor( 
    private snackBar: MatSnackBar,
    private commonService: CommonService){

  }
  get status(): string {
    if (this.workAuthDoc && this.workAuthDoc[this.workAuthDoc.length - 1].status) {
      return this.workAuthDoc[this.workAuthDoc.length - 1].status;
    }
    return '';
  }

  get feedback(): string {
    if (this.workAuthDoc && this.workAuthDoc[this.workAuthDoc.length - 1].feedback) {
      return this.workAuthDoc[this.workAuthDoc.length - 1].feedback;
    }
    return '';
  }

  handleUpload(file: File, callback: (url: string) => void) {
    this.snackBar.open('Uploading', 'Close');
    this.commonService.upload(file).subscribe((data) => {
      if (data.body.url) {
        callback(data.body.url);
        this.snackBar.open(data.body.message, 'Close');
      } else {
        this.snackBar.open('Upload Failed', 'Close');
      }
    });
  }

}
