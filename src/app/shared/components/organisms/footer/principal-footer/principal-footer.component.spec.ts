import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalFooterComponent } from './principal-footer.component';

describe('PrincipalFooterComponent', () => {
  let component: PrincipalFooterComponent;
  let fixture: ComponentFixture<PrincipalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
