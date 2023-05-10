import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { AppState } from 'src/app/store';
import { PersonalInfomationFormComponent } from './personal-infomation-form/personal-infomation-form.component';

import { buildFinalValues } from './utils/helper';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  @ViewChild('personForm', { static: false })
  personForm?: PersonalInfomationFormComponent;

  initUser: any;
  user: any;
  title = 'Personal Information';
  //form!: UntypedFormGroup;
  isEdit = false;

  maxDate = new Date();

  visaTypes = ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'];

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private commonService: CommonService,
    private authService: AuthService
  ) {
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        this.user = data.user;
        // this.initUser = JSON.parse(JSON.stringify(data.user));
      }
    });
  }

  handleCancel() {
    if (window.confirm('Discard all of their changes?')) {
      this.isEdit = false;
      this.user = this.initUser;
    }
  }

  handleEdit() {
    this.isEdit = true;
  }

  handleSave() {
    if (this.personForm?.form.valid) {
      const params = buildFinalValues(this.personForm?.form.value);
      this.authService.updateUserInfo(params).subscribe((res) => {
        if (res.body.success) {
          this.snackBar.open('Success', 'Close');
          this.isEdit = false;
        } else {
          this.snackBar.open(res.body.message || 'Error', 'Close', {});
        }
      });
    } else {
      this.snackBar.open('The form validation failed', 'Close', {});
      this.personForm?.form.markAllAsTouched();
    }
  }

  handleUpload(file: File, callback: (url: string) => void) {
    // this.snackBar.open('Uploading', 'Close');
    // this.commonService.upload(file).subscribe((data) => {
    //   if (data.body.url) {
    //     callback(data.body.url);
    //     this.snackBar.open(data.body.message, 'Close');
    //   } else {
    //     this.snackBar.open('Upload Failed', 'Close');
    //   }
    // });
  }

  handleAvatarUpload(event: any) {
    // this.handleUpload(event.target.files[0], (url) => {
    //   this.user = {
    //     ...this.user,
    //     profilePhoto: url,
    //   };
    // });
  }

  handleDriverLicenseUpload(event: any) {
    // this.handleUpload(event.target.files[0], (url) => {
    //   this.user = {
    //     ...this.user,
    //     driverLicense: {
    //       ...this.user.driverLicense,
    //       photo: url,
    //     },
    //   };
    // });
  }

  handleAuthDocUpload(event: any) {
    // TODO:
    // mutiple
  }
}
