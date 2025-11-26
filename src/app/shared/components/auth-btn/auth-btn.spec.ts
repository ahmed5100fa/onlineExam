import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBtn } from './auth-btn';

describe('AuthBtn', () => {
  let component: AuthBtn;
  let fixture: ComponentFixture<AuthBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
