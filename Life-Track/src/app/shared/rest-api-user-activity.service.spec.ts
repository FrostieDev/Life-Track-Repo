import { TestBed } from '@angular/core/testing';

import { RestApiUserActivityService } from './rest-api-user-activity.service';

describe('RestApiUserActivityService', () => {
  let service: RestApiUserActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestApiUserActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
