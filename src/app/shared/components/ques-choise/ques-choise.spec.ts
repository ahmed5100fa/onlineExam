import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesChoise } from './ques-choise';

describe('QuesChoise', () => {
  let component: QuesChoise;
  let fixture: ComponentFixture<QuesChoise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuesChoise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuesChoise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
