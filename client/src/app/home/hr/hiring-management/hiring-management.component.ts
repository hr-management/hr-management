import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent {
    
  form!: UntypedFormGroup;
    constructor(
    private fb: UntypedFormBuilder,
) {
    this.form =this.fb.group({email:['', [Validators.required, Validators.email]],name:['', [Validators.required]]});

  }
  ngOnInit() {
    
  }
  sendEmail() {
    console.log(this.form.value)
  }
}
