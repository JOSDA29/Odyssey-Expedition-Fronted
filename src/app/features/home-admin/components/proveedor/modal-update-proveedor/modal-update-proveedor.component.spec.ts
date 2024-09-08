import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateProveedorComponent } from './modal-update-proveedor.component';

describe('ModalUpdateProveedorComponent', () => {
  let component: ModalUpdateProveedorComponent;
  let fixture: ComponentFixture<ModalUpdateProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
