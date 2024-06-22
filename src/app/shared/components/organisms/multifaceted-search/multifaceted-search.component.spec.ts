import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultifacetedSearchComponent } from './multifaceted-search.component';

describe('MultifacetedSearchComponent', () => {
  let component: MultifacetedSearchComponent;
  let fixture: ComponentFixture<MultifacetedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultifacetedSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultifacetedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
