import { TestBed } from '@angular/core/testing';

import { StatusGroupService } from './status-group.service';

describe('StatusGroupService', () => {
  let service: StatusGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
