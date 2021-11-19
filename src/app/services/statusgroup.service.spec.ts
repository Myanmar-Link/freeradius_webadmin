import { TestBed } from '@angular/core/testing';

import { StatusgroupService } from './statusgroup.service';

describe('StatusgroupService', () => {
  let service: StatusgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
