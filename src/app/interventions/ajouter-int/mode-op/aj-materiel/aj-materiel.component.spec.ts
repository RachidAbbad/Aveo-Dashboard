import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjMaterielComponent } from './aj-materiel.component';

describe('AjMaterielComponent', () => {
  let component: AjMaterielComponent;
  let fixture: ComponentFixture<AjMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
