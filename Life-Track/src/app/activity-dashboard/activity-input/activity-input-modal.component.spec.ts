import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInputModalComponent } from './activity-input-modal.component';

describe('ActivityInputComponent', () => {
  let component: ActivityInputModalComponent;
  let fixture: ComponentFixture<ActivityInputModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityInputModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
