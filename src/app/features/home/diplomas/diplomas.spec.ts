import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diplomas } from './diplomas';

describe('Diplomas', () => {
  let component: Diplomas;
  let fixture: ComponentFixture<Diplomas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diplomas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diplomas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
