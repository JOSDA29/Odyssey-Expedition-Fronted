import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInfoComponent } from './tag-info.component';

describe('TagInfoComponent', () => {
  let component: TagInfoComponent;
  let fixture: ComponentFixture<TagInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
