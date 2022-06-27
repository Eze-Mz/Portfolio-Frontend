import { TestBed } from '@angular/core/testing';

import { ProgressCountService } from './progress-count.service';

describe('ProgressCountService', () => {
  let service: ProgressCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
