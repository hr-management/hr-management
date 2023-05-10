import { Component,ViewChild  } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { AppState } from 'src/app/store';
import { PersonalInfomationFormComponent } from './personal-infomation-form/personal-infomation-form.component';

import {
  buildFinalValues,
} from './utils/helper';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
    @ViewChild('personForm', { static: false }) personForm?: PersonalInfomationFormComponent;

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
    //this.personForm?.form = generateFormGroup(this.fb);
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        console.log(data.user);
        this.user = data.user
        //this.personForm?.form.setValue(getInitialValue(data.user));
      }
    });
    //this.personForm?.form.disable();
  }

  handleCancel() {
    this.isEdit = false;
  }

  handleEdit() {
    this.isEdit = true;
  }

  handleSave() {
    console.log(this.personForm?.form)
    if (this.personForm?.form.valid) {
      const params = buildFinalValues(this.personForm?.form.value);
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
      this.personForm?.form.markAllAsTouched();
    }
  }

  handleAvatarUpload(event: any) {
    const file = event.target.files[0];
    this.snackBar.open('Uploading', 'Close', { duration: 3000 });
    this.commonService.upload(file).subscribe((data) => {
      if (data.body.url) {
        this.personForm?.form.patchValue({ profilePhoto: data.body.url });
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
