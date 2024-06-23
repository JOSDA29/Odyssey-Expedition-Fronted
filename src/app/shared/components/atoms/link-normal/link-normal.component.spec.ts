import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNormalComponent } from './link-normal.component';

describe('LinkNormalComponent', () => {
  let component: LinkNormalComponent;
  let fixture: ComponentFixture<LinkNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNormalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
