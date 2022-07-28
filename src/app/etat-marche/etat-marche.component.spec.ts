import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatMarcheComponent } from './etat-marche.component';

describe('EtatMarcheComponent', () => {
  let component: EtatMarcheComponent;
  let fixture: ComponentFixture<EtatMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatMarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
