import { TestBed } from '@angular/core/testing';

import { HousingHrService } from './housing-hr.service';

describe('HousingHrService', () => {
  let service: HousingHrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingHrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
