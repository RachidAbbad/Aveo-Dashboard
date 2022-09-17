import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjActionsComponent } from './aj-actions.component';

describe('AjActionsComponent', () => {
  let component: AjActionsComponent;
  let fixture: ComponentFixture<AjActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
