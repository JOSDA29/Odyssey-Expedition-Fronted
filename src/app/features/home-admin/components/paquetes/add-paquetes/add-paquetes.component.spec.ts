import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaquetesComponent } from './add-paquetes.component';

describe('AddPaquetesComponent', () => {
  let component: AddPaquetesComponent;
  let fixture: ComponentFixture<AddPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaquetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
