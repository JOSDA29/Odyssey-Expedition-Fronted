import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCardServiceComponent } from './secondary-card-service.component';

describe('SecondaryCardServiceComponent', () => {
  let component: SecondaryCardServiceComponent;
  let fixture: ComponentFixture<SecondaryCardServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryCardServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondaryCardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
