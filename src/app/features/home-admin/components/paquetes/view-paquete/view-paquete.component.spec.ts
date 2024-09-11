import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaqueteComponent } from './view-paquete.component';

describe('ViewPaqueteComponent', () => {
  let component: ViewPaqueteComponent;
  let fixture: ComponentFixture<ViewPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPaqueteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
