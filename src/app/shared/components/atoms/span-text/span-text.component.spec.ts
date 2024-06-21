import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanTextComponent } from './span-text.component';

describe('SpanTextComponent', () => {
  let component: SpanTextComponent;
  let fixture: ComponentFixture<SpanTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpanTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpanTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
