import { TestBed } from '@angular/core/testing';

import { EtatMarcheService } from './etat-marche.service';

describe('EtatMarcheService', () => {
  let service: EtatMarcheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatMarcheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
