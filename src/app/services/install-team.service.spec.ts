import { TestBed } from '@angular/core/testing';

import { InstallTeamService } from './install-team.service';

describe('InstallTeamService', () => {
  let service: InstallTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
