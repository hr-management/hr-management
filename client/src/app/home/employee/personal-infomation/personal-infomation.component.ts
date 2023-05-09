import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-personal-infomation',
  templateUrl: './personal-infomation.component.html',
  styleUrls: ['./personal-infomation.component.scss'],
})
export class PersonalInfomationComponent {
  title = 'Personal Infomation';
  form!: UntypedFormGroup;
  isEdit = true;

  constructor(
    private snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService
  ) {
    const { required } = Validators;
    this.form = this.fb.group({
      profilePhoto: [''],
      firstName: ['', [required]],
      lastName: ['', [required]],
      middleName: [''],
      preferredName: [''],
    });
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        this.form.setValue({
          profilePhoto: data.user.profilePhoto,
          firstName: data.user.firstname || '',
          lastName: data.user.lastName || '',
          middleName: data.user.middleName || '',
          preferredName: data.user.preferredName || '',
        });
      }
    });
    // this.form.disable();
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
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    this.snackBar.open('Uploading', 'Close', { duration: 3000 });
    this.commonService.upload(file).subscribe((data) => {
      console.log(data);
    });
  }
}
