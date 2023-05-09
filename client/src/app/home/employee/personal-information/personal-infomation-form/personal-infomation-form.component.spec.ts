import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfomationFormComponent } from './personal-infomation-form.component';

describe('PersonalInfomationFormComponent', () => {
  let component: PersonalInfomationFormComponent;
  let fixture: ComponentFixture<PersonalInfomationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfomationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfomationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
