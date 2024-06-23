import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsServicesListComponent } from './cards-services-list.component';

describe('CardsServicesListComponent', () => {
  let component: CardsServicesListComponent;
  let fixture: ComponentFixture<CardsServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsServicesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
