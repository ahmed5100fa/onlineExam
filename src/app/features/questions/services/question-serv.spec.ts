import { TestBed } from '@angular/core/testing';

import { QuestionServ } from './question-serv';

describe('QuestionServ', () => {
  let service: QuestionServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
