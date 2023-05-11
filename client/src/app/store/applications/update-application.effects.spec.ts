import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateApplicationEffects } from './update-application.effects';

describe('UpdateApplicationEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateApplicationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateApplicationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UpdateApplicationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
