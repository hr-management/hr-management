import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetVisaEmployeesEffects } from './get-visa-employees.effects';

describe('GetVisaEmployeesEffects', () => {
  let actions$: Observable<any>;
  let effects: GetVisaEmployeesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetVisaEmployeesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetVisaEmployeesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
