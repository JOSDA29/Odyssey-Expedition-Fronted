import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteAdviserComponent } from './transporte-adviser.component';

describe('TransporteAdviserComponent', () => {
  let component: TransporteAdviserComponent;
  let fixture: ComponentFixture<TransporteAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransporteAdviserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
