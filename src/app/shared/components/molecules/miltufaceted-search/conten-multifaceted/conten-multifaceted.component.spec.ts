import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenMultifacetedComponent } from './conten-multifaceted.component';

describe('ContenMultifacetedComponent', () => {
  let component: ContenMultifacetedComponent;
  let fixture: ComponentFixture<ContenMultifacetedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenMultifacetedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenMultifacetedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
