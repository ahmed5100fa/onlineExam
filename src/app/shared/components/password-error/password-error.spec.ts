import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordError } from './password-error';

describe('PasswordError', () => {
  let component: PasswordError;
  let fixture: ComponentFixture<PasswordError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
