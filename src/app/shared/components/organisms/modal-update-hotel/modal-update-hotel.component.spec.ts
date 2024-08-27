import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateHotelComponent } from './modal-update-hotel.component';

describe('ModalUpdateHotelComponent', () => {
  let component: ModalUpdateHotelComponent;
  let fixture: ComponentFixture<ModalUpdateHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
