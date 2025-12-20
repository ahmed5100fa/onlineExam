import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasswordError } from './repassword-error';

describe('RepasswordError', () => {
  let component: RepasswordError;
  let fixture: ComponentFixture<RepasswordError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepasswordError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepasswordError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
