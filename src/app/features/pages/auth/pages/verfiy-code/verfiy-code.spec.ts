import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyCode } from './verfiy-code';

describe('VerfiyCode', () => {
  let component: VerfiyCode;
  let fixture: ComponentFixture<VerfiyCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerfiyCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiyCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
