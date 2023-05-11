import { OnboardingApplicationFormComponent } from './onboarding-application-form/onboarding-application-form.component';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { AppState } from 'src/app/store';

import { buildFinalValues } from './utils/helper';

@Component({
  selector: 'app-onboarding-application',
  templateUrl: './onboarding-application.component.html',
  styleUrls: ['./onboarding-application.component.scss'],
})
export class OnboardingApplicationComponent {
  @ViewChild('onboardingForm', { static: false })
  onboardingForm?: OnboardingApplicationFormComponent;
  user: any;
  title = 'Onboarding Application';
  isEdit = true;

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        console.log(data.user);
        this.user = data.user;
        this.isEdit =
          data.user.applicationStatus === 'notStarted' ||
          data.user.applicationStatus === 'pending';
      }
    });
  }

  handleSave() {
    if (this.onboardingForm?.form.valid) {
      const params = buildFinalValues(this.onboardingForm?.form.value);
      this.authService.updateStatus({}).subscribe((res) => {
        if (res.body.success) {
          this.snackBar.open('Success', 'Close', {});
        } else {
          this.snackBar.open(res.body.message || 'Error', 'Close', {
            duration: 3000,
          });
        }
      });
      this.authService.updateUserInfo(params).subscribe((res) => {
        this.isEdit = false;
      });
    } else {
      this.snackBar.open('The form validation failed', 'Close', {
        duration: 3000,
      });
      this.onboardingForm?.form.markAllAsTouched();
    }
  }
}
