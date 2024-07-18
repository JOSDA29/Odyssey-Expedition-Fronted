import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdatesComponent } from './form-updates.component';

describe('FormUpdatesComponent', () => {
  let component: FormUpdatesComponent;
  let fixture: ComponentFixture<FormUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUpdatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
