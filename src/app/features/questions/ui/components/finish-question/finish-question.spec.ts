import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishQuestion } from './finish-question';

describe('FinishQuestion', () => {
  let component: FinishQuestion;
  let fixture: ComponentFixture<FinishQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
