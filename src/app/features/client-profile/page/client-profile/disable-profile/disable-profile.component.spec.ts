import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableProfileComponent } from './disable-profile.component';

describe('DisableProfileComponent', () => {
  let component: DisableProfileComponent;
  let fixture: ComponentFixture<DisableProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisableProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisableProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
