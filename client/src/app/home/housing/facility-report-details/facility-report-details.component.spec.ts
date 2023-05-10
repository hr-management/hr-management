import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportDetailsComponent } from './facility-report-details.component';

describe('FacilityReportDetailsComponent', () => {
  let component: FacilityReportDetailsComponent;
  let fixture: ComponentFixture<FacilityReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityReportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
