import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFootComponent } from './nav-foot.component';

describe('NavFootComponent', () => {
  let component: NavFootComponent;
  let fixture: ComponentFixture<NavFootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
