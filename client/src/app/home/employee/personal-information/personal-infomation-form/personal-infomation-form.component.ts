import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/CommonService/common-service.service';
import { downloadURL } from 'src/app/utils';

import {
  buildFinalValues,
  generateFormGroup,
  getInitialValue,
} from '../utils/helper';

@Component({
  selector: 'app-personal-infomation-form',
  templateUrl: './personal-infomation-form.component.html',
  styleUrls: ['./personal-infomation-form.component.scss'],
})
export class PersonalInfomationFormComponent {
  @Input() user: any;
  @Input() isEdit: boolean = false;

  @Input() hideUplodProfile: boolean = false;
  @Input() displayCarInfo: boolean = false;

  form!: UntypedFormGroup;

  maxDate = new Date();

  visaTypes = ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'];
  workAuthStatus = ['notSubmitted', 'submitted', 'rejected', 'approved'];

  workAuthDocArray: any;

  showWorkAuthorization = false;
  showF1Receipt = false;
  showOtherVisa = false;
  showStartEndDate = false;

  constructor(
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService
  ) {
    this.form = generateFormGroup(this.fb);
  }

  onCitizenshipChange(event: Event) {
    const citizenship = (event.target as HTMLSelectElement).value;
    if (citizenship === 'no') {
      this.showWorkAuthorization = true;
    } else {
      this.showWorkAuthorization = false;
      this.showF1Receipt = false;
      this.showOtherVisa = false;
      this.showStartEndDate = false;
    }
  }

  onAuthorizationChange(event: Event) {
    const authorization = (event.target as HTMLSelectElement).value;
    switch (authorization) {
      case 'f1':
        this.showF1Receipt = true;
        this.showOtherVisa = false;
        this.showStartEndDate = false;
        break;
      case 'other':
        this.showF1Receipt = false;
        this.showOtherVisa = true;
        this.showStartEndDate = false;
        break;
      default:
        this.showF1Receipt = false;
        this.showOtherVisa = false;
        this.showStartEndDate = true;
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      if (this.user) {
        console.log(this.user);
        const { initialValue, workAuthDoc } = getInitialValue(
          this.user,
          this.fb
        );
        this.form.patchValue(initialValue);
        this.form.setControl(
          'workAuthDoc',
          this.fb.array(
            workAuthDoc.map((doc: any) =>
              this.fb.group({
                type: doc.type,
                status: doc.status,
                file: doc.file,
                feedback: doc.feedback,
              })
            )
          )
        );
        this.workAuthDocArray = (
          this.form.get('workAuthDoc') as FormArray
        ).controls;
      }
    }
    if (this.isEdit) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  handleDownload(field: string) {
    const url = this.form.value[field];
    if (url) {
      downloadURL(url);
    }
  }

  handleWorkAuthDocDownload(index: number) {
    const url = this.form.value['workAuthDoc'][index]?.file;
    if (url) {
      downloadURL(url);
    }
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

  doHandleAvatarUpload(event: any) {
    this.handleUpload(event.target.files[0], (url) => {
      this.form.patchValue({
        profilePhoto: url,
      });
    });
  }

  doHandleDriverLicenseUpload(event: any) {
    this.handleUpload(event.target.files[0], (url) => {
      this.form.patchValue({
        dphoto: url,
      });
    });
  }

  doHandleAuthDocUpload(event: any, index: number) {
    this.handleUpload(event.target.files[0], (url) => {
      this.form.patchValue({
        workAuthDoc: this.form.value.workAuthDoc.map((doc: any, i: number) => {
          if (i === index) {
            return {
              ...doc,
              file: url,
            };
          }
          return doc;
        }),
      });
    });
  }

  handleDeleteAuthDoc(i: number) {
    const workAuthDoc = this.form.get('workAuthDoc') as FormArray;
    workAuthDoc.removeAt(i);
  }

  handleAddAuthDoc() {
    const workAuthDoc = this.form.get('workAuthDoc') as FormArray;
    workAuthDoc.push(
      this.fb.group({
        type: '',
        status: '',
        file: '',
        feedback: '',
      })
    );
  }
}
