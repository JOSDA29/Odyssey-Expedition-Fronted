import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingModalComponent } from './hotel-booking-modal.component';

describe('HotelBookingModalComponent', () => {
  let component: HotelBookingModalComponent;
  let fixture: ComponentFixture<HotelBookingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelBookingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
