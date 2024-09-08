import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VewProveedoresComponent } from './vew-proveedores.component';

describe('VewProveedoresComponent', () => {
  let component: VewProveedoresComponent;
  let fixture: ComponentFixture<VewProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VewProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VewProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
