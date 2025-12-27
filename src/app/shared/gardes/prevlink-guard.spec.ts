import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { prevlinkGuard } from './prevlink-guard';

describe('prevlinkGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => prevlinkGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
