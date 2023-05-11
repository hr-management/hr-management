import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
  @Output() handleAvatarUpload: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() handleAuthDocUpload: EventEmitter<Event> =
    new EventEmitter<Event>();
  @Output() handleDriverLicenseUpload: EventEmitter<Event> =
    new EventEmitter<Event>();

  @Input() hideUplodProfile: boolean = false;

  form!: UntypedFormGroup;

  maxDate = new Date();

  visaTypes = ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'];
  workAuthStatus = ['notSubmitted', 'submitted', 'rejected', 'approved'];

  constructor(private fb: UntypedFormBuilder) {
    this.form = generateFormGroup(this.fb);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      if (this.user) {
        console.log(this.user);
        this.form.setValue(getInitialValue(this.user));
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

  doHandleAvatarUpload(event: Event) {
    this.handleAvatarUpload.emit(event);
  }

  doHandleDriverLicenseUpload(event: Event) {
    this.handleDriverLicenseUpload.emit(event);
  }
}
