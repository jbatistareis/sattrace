import { TestBed, inject } from '@angular/core/testing';

import { TleTrackService } from './tle-track.service';

describe('TleTrackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TleTrackService]
    });
  });

  it('should be created', inject([TleTrackService], (service: TleTrackService) => {
    expect(service).toBeTruthy();
  }));
});
