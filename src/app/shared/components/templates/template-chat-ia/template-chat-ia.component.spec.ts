import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateChatIAComponent } from './template-chat-ia.component';

describe('TemplateChatIAComponent', () => {
  let component: TemplateChatIAComponent;
  let fixture: ComponentFixture<TemplateChatIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateChatIAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateChatIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
