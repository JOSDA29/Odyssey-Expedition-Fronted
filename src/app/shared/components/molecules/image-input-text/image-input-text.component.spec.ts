import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputTextComponent } from './image-input-text.component';

describe('ImageInputTextComponent', () => {
  let component: ImageInputTextComponent;
  let fixture: ComponentFixture<ImageInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageInputTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
