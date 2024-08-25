import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaquetesComponent } from './search-paquetes.component';

describe('SearchPaquetesComponent', () => {
  let component: SearchPaquetesComponent;
  let fixture: ComponentFixture<SearchPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPaquetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
