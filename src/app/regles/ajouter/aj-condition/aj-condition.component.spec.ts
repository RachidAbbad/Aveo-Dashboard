import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjConditionComponent } from './aj-condition.component';

describe('AjConditionComponent', () => {
  let component: AjConditionComponent;
  let fixture: ComponentFixture<AjConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
