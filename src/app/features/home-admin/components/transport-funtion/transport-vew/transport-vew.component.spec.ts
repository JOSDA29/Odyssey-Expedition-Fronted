import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportVewComponent } from './transport-vew.component';

describe('TransportVewComponent', () => {
  let component: TransportVewComponent;
  let fixture: ComponentFixture<TransportVewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportVewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportVewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
