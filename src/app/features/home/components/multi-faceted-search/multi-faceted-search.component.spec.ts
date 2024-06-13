import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFacetedSearchComponent } from './multi-faceted-search.component';

describe('MultiFacetedSearchComponent', () => {
  let component: MultiFacetedSearchComponent;
  let fixture: ComponentFixture<MultiFacetedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiFacetedSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiFacetedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
