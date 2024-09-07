import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataHotelComponent } from './view-data-hotel.component';

describe('ViewDataHotelComponent', () => {
  let component: ViewDataHotelComponent;
  let fixture: ComponentFixture<ViewDataHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDataHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDataHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
