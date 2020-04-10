import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRecurrentOverviewComponent } from './activity-recurrent-overview.component';

describe('ActivityRecurrentOverviewComponent', () => {
  let component: ActivityRecurrentOverviewComponent;
  let fixture: ComponentFixture<ActivityRecurrentOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityRecurrentOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRecurrentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
