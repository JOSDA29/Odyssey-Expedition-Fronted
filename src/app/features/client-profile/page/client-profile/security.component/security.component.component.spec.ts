import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityComponentComponent } from './security.component.component';

describe('SecurityComponentComponent', () => {
  let component: SecurityComponentComponent;
  let fixture: ComponentFixture<SecurityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
