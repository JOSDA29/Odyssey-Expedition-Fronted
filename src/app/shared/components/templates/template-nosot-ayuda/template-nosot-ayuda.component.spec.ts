import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNosotAyudaComponent } from './template-nosot-ayuda.component';

describe('TemplateNosotAyudaComponent', () => {
  let component: TemplateNosotAyudaComponent;
  let fixture: ComponentFixture<TemplateNosotAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateNosotAyudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateNosotAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
