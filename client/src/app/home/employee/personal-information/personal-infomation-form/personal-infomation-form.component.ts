import { Component,Input} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import {
  buildFinalValues,
  generateFormGroup,
  getInitialValue,
} from '../utils/helper';

@Component({
  selector: 'app-personal-infomation-form',
  templateUrl: './personal-infomation-form.component.html',
  styleUrls: ['./personal-infomation-form.component.scss']
})
export class PersonalInfomationFormComponent {
  @Input() user: any
  @Input() isEdit: boolean=false
  @Input() handleAvatarUpload: any
  @Input() hideUplodProfile:boolean=false
  title = 'Personal Information';
  form!: UntypedFormGroup;

  maxDate = new Date();

  visaTypes = ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'];

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.form = generateFormGroup(this.fb);

  }

  ngOnChanges() {
    if (this.user) {
      console.log(this.user)
    this.form.setValue(getInitialValue(this.user));
    this.form.disable()
    }
    
}
}
