import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanImageComponent } from './span-image.component';

describe('SpanImageComponent', () => {
  let component: SpanImageComponent;
  let fixture: ComponentFixture<SpanImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpanImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpanImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
