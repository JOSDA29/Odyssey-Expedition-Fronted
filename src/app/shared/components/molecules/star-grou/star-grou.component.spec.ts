import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarGrouComponent } from './star-grou.component';

describe('StarGrouComponent', () => {
  let component: StarGrouComponent;
  let fixture: ComponentFixture<StarGrouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarGrouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarGrouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
