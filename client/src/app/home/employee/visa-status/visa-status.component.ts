import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { AppState } from 'src/app/store';
import { downloadURL } from 'src/app/utils';
import * as GetUserAction from '../../../store/auth/get-user.actions';

const defaultVisa = {
  type: 'OPT_Receipt',
  status: 'notSubmitted',
  file: '',
  feedback: '',
};

const messages: Record<string, any> = {
  OPT_Receipt: {
    notSubmitted: 'You should submit in onboarding application page',
    submitted: 'Waiting for HR to approve your OPT Receipt.',
    approved: 'Please upload a copy of your OPT EAD.',
    rejected: 'Rejected after HR review',
  },
  OPT_EAD: {
    submitted: 'Waiting for HR to approve your OPT EAD',
    approved: 'Please download and fill out the I-983 form',
    rejected: 'Rejected after HR review',
  },
  'I-983': {
    submitted: 'Waiting for HR to approve and sign your I-983',
    approved:
      'Please send the I-983 along with all necessary documents to your school and upload the new I-20',
    rejected: 'Rejected after HR review',
  },
  'I-20': {
    submitted: 'Waiting for HR to approve your I-20',
    approved: 'All documents have been approved',
    rejected: 'Rejected after HR review',
  },
};

@Component({
  selector: 'app-visa-status',
  templateUrl: './visa-status.component.html',
  styleUrls: ['./visa-status.component.scss'],
})
export class VisaStatusComponent {
  user: any;
  title = 'Visa Status';

  visa_order = ['OPT_Receipt', 'OPT_EAD', 'I-983', 'I-20'];
  workAuthStatus = ['notSubmitted', 'submitted', 'rejected', 'approved'];

  current = defaultVisa;
  currentIndex = 0;
  message = '-';
  canUpload = false;
  canDownloadTemplates = false;

  uploadedFileUrl = '';

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private commonService: CommonService,
    private authService: AuthService
  ) {
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        this.user = data.user;
        const { workAuthDoc } = data.user;
        const current = workAuthDoc[workAuthDoc.length - 1];
        if (current) {
          this.current = current;
          this.currentIndex = workAuthDoc.length - 1;

          // message
          const { type, status } = current;
          const message = messages?.[type]?.[status] ?? '-';
          this.message = message;
          // canUpload
          this.canUpload =
            (type !== 'I-20' && status === 'approved') || status === 'rejected';
          // canDownloadTemplates
          this.canDownloadTemplates =
            type === 'OPT_EAD' && status === 'approved';
          // uploadedFileUrl
          this.uploadedFileUrl = status === 'approved' ? '' : current.file;
        }
      }
    });
  }

  handleDownload(fileType: string) {
    let url;
    if (fileType === 'empty') {
      // TODO SERVER URL
      url = 'http://localhost:3001/empty-template.pdf';
      downloadURL(url, 'empty-template.pdf');
    }
    if (fileType === 'sample') {
      // TODO SERVER URL
      url = 'http://localhost:3001/sample-template.pdf';
      downloadURL(url, 'sample-template.pdf');
    }
  }

  handleSubmit() {
    this.snackBar.open('Loading', 'Close');
    this.authService.upadteUserVisa({ file: this.uploadedFileUrl }).subscribe({
      next: (res) => {
        if (res.body.success) {
          this.snackBar.open('Success', 'Close');
          // refresh userinfo
          this.store.dispatch(GetUserAction.GetUsersStart());
        } else {
          this.snackBar.open(res.body.message || 'Error', 'Close', {});
        }
      },
      error: (err: any) => {
        this.snackBar.open(err.error.message, 'Close');
      },
    });
  }

  doUpload(event: any) {
    this.snackBar.open('Uploading', 'Close');
    this.commonService.upload(event.target.files[0]).subscribe((data) => {
      if (data.body.url) {
        this.uploadedFileUrl = data.body.url;
        this.snackBar.open(data.body.message, 'Close');
      } else {
        this.snackBar.open('Upload Failed', 'Close');
      }
    });
  }
}
