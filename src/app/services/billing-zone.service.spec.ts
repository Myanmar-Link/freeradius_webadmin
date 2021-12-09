import { TestBed } from '@angular/core/testing';

import { BillingZoneService } from './billing-zone.service';

describe('BillingZoneService', () => {
  let service: BillingZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
