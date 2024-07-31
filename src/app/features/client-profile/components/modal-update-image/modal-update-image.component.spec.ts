import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateImageComponent } from './modal-update-image.component';

describe('ModalUpdateImageComponent', () => {
  let component: ModalUpdateImageComponent;
  let fixture: ComponentFixture<ModalUpdateImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
