import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterIntComponent } from './ajouter-int.component';

describe('AjouterIntComponent', () => {
  let component: AjouterIntComponent;
  let fixture: ComponentFixture<AjouterIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
