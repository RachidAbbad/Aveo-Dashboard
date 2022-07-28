import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOpComponent } from './mode-op.component';

describe('ModeOpComponent', () => {
  let component: ModeOpComponent;
  let fixture: ComponentFixture<ModeOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeOpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
