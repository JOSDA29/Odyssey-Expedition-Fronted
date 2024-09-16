import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEspesificComponent } from './search-espesific.component';

describe('SearchEspesificComponent', () => {
  let component: SearchEspesificComponent;
  let fixture: ComponentFixture<SearchEspesificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchEspesificComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEspesificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
