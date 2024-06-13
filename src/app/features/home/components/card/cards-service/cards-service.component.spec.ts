import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsServiceComponent } from './cards-service.component';

describe('CardsServiceComponent', () => {
  let component: CardsServiceComponent;
  let fixture: ComponentFixture<CardsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
