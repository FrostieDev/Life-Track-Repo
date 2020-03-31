import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesLatestComponent } from './activities-latest.component';

describe('ActivitiesLatestComponent', () => {
  let component: ActivitiesLatestComponent;
  let fixture: ComponentFixture<ActivitiesLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
