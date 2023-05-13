import { OnboardingApplicationFormComponent } from './onboarding-application-form/onboarding-application-form.component';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { AppState } from 'src/app/store';
import * as GetUserAction from '../../../store/auth/get-user.actions';

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
          data.user.applicationStatus === 'rejected';
      }
    });
  }

  handleSave() {
    if (this.onboardingForm?.form.valid) {
      const params = buildFinalValues(this.onboardingForm?.form.value);
      this.authService.updateStatus(params).subscribe({
        next: (res) => {
          if (res.body.success) {
            this.snackBar.open('Success', 'Close');
            // refresh userinfo
            this.store.dispatch(GetUserAction.GetUsersStart());
          } else {
            this.snackBar.open(
              res.body.message || res.body.errors.join(',') || 'Error',
              'Close'
            );
          }
        },
        error: (err: any) => {
          this.snackBar.open(err.error.message, 'Close');
        },
      });
    } else {
      this.snackBar.open('The form validation failed', 'Close');
      this.onboardingForm?.form.markAllAsTouched();
    }
  }
}
