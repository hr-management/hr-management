import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import {
  buildFinalValues,
  generateFormGroup,
  getInitialValue,
} from '../utils/helper';

@Component({
  selector: 'app-onboarding-application-form',
  templateUrl: './onboarding-application-form.component.html',
  styleUrls: ['./onboarding-application-form.component.scss'],
})
export class OnboardingApplicationFormComponent {
  @Input() user: any;
  @Input() isEdit: boolean = true;
  @Input() status: string = '';
  form!: UntypedFormGroup;
  showWorkAuthorization = false;
  showF1Receipt = false;
  showOtherVisa = false;
  showStartEndDate = false;


  maxDate = new Date();
  constructor(private fb: UntypedFormBuilder) {
    this.form = generateFormGroup(this.fb);
  }

  ngOnChanges() {
    if (this.user) {
      console.log(this.user);
      this.form.setValue(getInitialValue(this.user));
    }
    if (this.isEdit) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
}
