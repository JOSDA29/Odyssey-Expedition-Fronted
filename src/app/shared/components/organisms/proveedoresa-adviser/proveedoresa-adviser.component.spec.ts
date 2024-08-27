import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresaAdviserComponent } from './proveedoresa-adviser.component';

describe('ProveedoresaAdviserComponent', () => {
  let component: ProveedoresaAdviserComponent;
  let fixture: ComponentFixture<ProveedoresaAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedoresaAdviserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresaAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
