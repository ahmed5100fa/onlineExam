import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSidebarHeader } from './home-sidebar-header';

describe('HomeSidebarHeader', () => {
  let component: HomeSidebarHeader;
  let fixture: ComponentFixture<HomeSidebarHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSidebarHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSidebarHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
