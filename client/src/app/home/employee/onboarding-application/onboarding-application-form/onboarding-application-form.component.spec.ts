import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingApplicationFormComponent } from './onboarding-application-form.component';

describe('OnboardingApplicationFormComponent', () => {
  let component: OnboardingApplicationFormComponent;
  let fixture: ComponentFixture<OnboardingApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingApplicationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
