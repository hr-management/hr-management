import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { AppState } from 'src/app/store';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';
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
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        this.user = data.user;
        this.initUser = JSON.parse(JSON.stringify(data.user));
      }
    });
  }

  handleCancel() {
    const dialogRef = this.dialog.open(ConfirmDailogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.isEdit = false;
        this.user = this.initUser;
      }
    });
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
}
