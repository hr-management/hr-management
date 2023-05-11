import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SendInvitationEmailEffects } from './send-invitation-email.effects';

describe('SendInvitationEmailEffects', () => {
  let actions$: Observable<any>;
  let effects: SendInvitationEmailEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SendInvitationEmailEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SendInvitationEmailEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
