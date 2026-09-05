import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookedPackageComponent } from './view-booked-package.component';

describe('ViewBookedPackageComponent', () => {
  let component: ViewBookedPackageComponent;
  let fixture: ComponentFixture<ViewBookedPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookedPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookedPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
