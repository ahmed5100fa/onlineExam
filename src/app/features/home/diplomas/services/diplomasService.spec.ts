import { TestBed } from '@angular/core/testing';

import { Diplomas } from './diplomasService';

describe('Diplomas', () => {
  let service: Diplomas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diplomas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
