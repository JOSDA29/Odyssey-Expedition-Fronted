import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStatusComponent } from './empty-status.component';

describe('EmptyStatusComponent', () => {
  let component: EmptyStatusComponent;
  let fixture: ComponentFixture<EmptyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
