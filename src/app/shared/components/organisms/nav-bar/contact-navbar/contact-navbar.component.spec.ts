import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNavbarComponent } from './contact-navbar.component';

describe('ContactNavbarComponent', () => {
  let component: ContactNavbarComponent;
  let fixture: ComponentFixture<ContactNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
