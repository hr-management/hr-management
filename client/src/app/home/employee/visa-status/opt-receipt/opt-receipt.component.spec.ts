import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptReceiptComponent } from './opt-receipt.component';

describe('OptReceiptComponent', () => {
  let component: OptReceiptComponent;
  let fixture: ComponentFixture<OptReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
