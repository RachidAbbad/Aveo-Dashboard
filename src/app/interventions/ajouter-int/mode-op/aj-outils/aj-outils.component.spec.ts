import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjOutilsComponent } from './aj-outils.component';

describe('AjOutilsComponent', () => {
  let component: AjOutilsComponent;
  let fixture: ComponentFixture<AjOutilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjOutilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjOutilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
