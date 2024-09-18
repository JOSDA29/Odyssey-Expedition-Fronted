import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasBoartComponent } from './das-boart.component';

describe('DasBoartComponent', () => {
  let component: DasBoartComponent;
  let fixture: ComponentFixture<DasBoartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DasBoartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasBoartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
