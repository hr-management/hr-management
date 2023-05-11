import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetApplicationsEffects } from './get-applications.effects';

describe('GetApplicationsEffects', () => {
  let actions$: Observable<any>;
  let effects: GetApplicationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetApplicationsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetApplicationsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
