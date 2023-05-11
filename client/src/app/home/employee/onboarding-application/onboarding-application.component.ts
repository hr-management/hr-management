import { OnboardingApplicationFormComponent } from './onboarding-application-form/onboarding-application-form.component';
import { Component,ViewChild  } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { AppState } from 'src/app/store';

import {
  buildFinalValues,
} from './utils/helper';

@Component({
  selector: 'app-onboarding-application',
  templateUrl: './onboarding-application.component.html',
  styleUrls: ['./onboarding-application.component.scss']
})
export class OnboardingApplicationComponent {
  @ViewChild('onboardingForm', { static: false }) onboardingForm?: OnboardingApplicationFormComponent;
  user: any;
  status: string = "";
  title = 'Onboarding Application';
  isEdit = true;
  maxDate = new Date();


  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private commonService: CommonService,
    private authService: AuthService
  ) {
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        console.log(data.user);
        this.user = data.user;
        this.status = data.user.status;
      }
    });
  }

  handleCancel() {
    this.isEdit = false;
  }

  handleEdit() {
    this.isEdit = true;
  }

  handleSave() {
    console.log(this.onboardingForm?.form)
    if (this.onboardingForm?.form.valid) {
      const params = buildFinalValues(this.onboardingForm?.form.value);
      this.authService.updateUserInfo(params).subscribe((res) => {
        if (res.body.success) {
          this.snackBar.open('Success', 'Close', {
            duration: 1000,
          });
          this.isEdit = false
        } else {
          this.snackBar.open(res.body.message || 'Error', 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      this.snackBar.open('The form validation failed', 'Close', {
        duration: 3000,
      });
      this.onboardingForm?.form.markAllAsTouched();
    }
  }

  handleAvatarUpload(event: any) {
    const file = event.target.files[0];
    this.snackBar.open('Uploading', 'Close', { duration: 3000 });
    this.commonService.upload(file).subscribe((data) => {
      if (data.body.url) {
        this.onboardingForm?.form.patchValue({ profilePhoto: data.body.url });
        this.snackBar.open(data.body.message, 'Close', {
          duration: 1000,
        });
      } else {
        this.snackBar.open('Failed', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}
