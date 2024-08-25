import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCruserosComponent } from './search-cruseros.component';

describe('SearchCruserosComponent', () => {
  let component: SearchCruserosComponent;
  let fixture: ComponentFixture<SearchCruserosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCruserosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCruserosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
