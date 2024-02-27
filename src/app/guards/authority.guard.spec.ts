import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authorityGuard } from './authority.guard';

describe('authorityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authorityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
