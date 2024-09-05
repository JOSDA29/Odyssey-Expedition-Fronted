import { TestBed } from '@angular/core/testing';

import { HotelUpdateServiceService } from './hotel-update-service.service';

describe('HotelUpdateServiceService', () => {
  let service: HotelUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
