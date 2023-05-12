import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateVisaAuthDocEffects } from './update-visa-auth-doc.effects';

describe('UpdateVisaAuthDocEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateVisaAuthDocEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateVisaAuthDocEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UpdateVisaAuthDocEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
