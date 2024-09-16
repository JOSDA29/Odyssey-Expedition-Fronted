import { TestBed } from '@angular/core/testing';

import { ModalVewPaqueteService } from './modal-vew-paquete.service';

describe('ModalVewPaqueteService', () => {
  let service: ModalVewPaqueteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalVewPaqueteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
