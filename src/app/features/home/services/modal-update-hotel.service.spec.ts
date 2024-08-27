import { TestBed } from '@angular/core/testing';

import { ModalUpdateHotelService } from './modal-update-hotel.service';

describe('ModalUpdateHotelService', () => {
  let service: ModalUpdateHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUpdateHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
