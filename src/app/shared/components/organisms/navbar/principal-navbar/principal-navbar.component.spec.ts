import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalNavbarComponent } from './principal-navbar.component';

describe('PrincipalNavbarComponent', () => {
  let component: PrincipalNavbarComponent;
  let fixture: ComponentFixture<PrincipalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
