import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageAdviserComponent } from './package-adviser.component';

describe('PackageAdviserComponent', () => {
  let component: PackageAdviserComponent;
  let fixture: ComponentFixture<PackageAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageAdviserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
