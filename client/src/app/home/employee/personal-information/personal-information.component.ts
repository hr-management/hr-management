import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { AppState } from 'src/app/store';
import {
  buildFinalValues,
  generateFormGroup,
  getInitialValue,
} from './utils/helper';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  title = 'Personal Information';
  form!: UntypedFormGroup;
  isEdit = false;

  maxDate = new Date();

  visaTypes = ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'];

  constructor(
    private snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private authService: AuthService
  ) {
    this.form = generateFormGroup(this.fb);
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        this.form.setValue(getInitialValue(data.user));
      }
    });
    this.form.disable();
  }

  handleCancel() {
    this.isEdit = false;
    this.form.disable();
  }

  handleEdit() {
    this.isEdit = true;
    this.form.enable();
  }

  handleSave() {
    console.log(this.form)
    if (this.form.valid) {
      const params = buildFinalValues(this.form.value);
      this.authService.updateUserInfo(params).subscribe((res) => {
        if (res.body.success) {
          this.snackBar.open('Success', 'Close', {
            duration: 1000,
          });
          // this.form.disable();
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
      this.form.markAllAsTouched();
    }
  }

  handleAvatarUpload(event: any) {
    const file = event.target.files[0];
    this.snackBar.open('Uploading', 'Close', { duration: 3000 });
    this.commonService.upload(file).subscribe((data) => {
      if (data.body.url) {
        this.form.patchValue({ profilePhoto: data.body.url });
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
