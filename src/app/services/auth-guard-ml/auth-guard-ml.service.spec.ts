import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardMlService } from './auth-guard-ml.service';

describe('AuthGuardMlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardMlService]
    });
  });

  it('should be created', inject([AuthGuardMlService], (service: AuthGuardMlService) => {
    expect(service).toBeTruthy();
  }));
});
