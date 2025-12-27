import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Changeprofilepass } from './changeprofilepass';

describe('Changeprofilepass', () => {
  let component: Changeprofilepass;
  let fixture: ComponentFixture<Changeprofilepass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Changeprofilepass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Changeprofilepass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
