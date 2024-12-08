import { TestBed } from '@angular/core/testing';

import { CrudMeetingService } from './crud-meeting.service';

describe('CrudMeetingService', () => {
  let service: CrudMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
