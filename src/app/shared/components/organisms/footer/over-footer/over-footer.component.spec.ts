import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverFooterComponent } from './over-footer.component';

describe('OverFooterComponent', () => {
  let component: OverFooterComponent;
  let fixture: ComponentFixture<OverFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
