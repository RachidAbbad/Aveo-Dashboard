import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPeriodeComponent } from './custom-periode.component';

describe('CustomPeriodeComponent', () => {
  let component: CustomPeriodeComponent;
  let fixture: ComponentFixture<CustomPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPeriodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
