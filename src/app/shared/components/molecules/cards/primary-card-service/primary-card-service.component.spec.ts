import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryCardServiceComponent } from './primary-card-service.component';

describe('PrimaryCardServiceComponent', () => {
  let component: PrimaryCardServiceComponent;
  let fixture: ComponentFixture<PrimaryCardServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryCardServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryCardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
