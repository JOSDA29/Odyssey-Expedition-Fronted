import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsInfoComponent } from './sections-info.component';

describe('SectionsInfoComponent', () => {
  let component: SectionsInfoComponent;
  let fixture: ComponentFixture<SectionsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
