import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjActionComponent } from './aj-action.component';

describe('AjActionComponent', () => {
  let component: AjActionComponent;
  let fixture: ComponentFixture<AjActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
