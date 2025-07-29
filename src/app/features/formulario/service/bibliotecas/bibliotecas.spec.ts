import { TestBed } from '@angular/core/testing';

import { Bibliotecas } from './bibliotecas';

describe('Bibliotecas', () => {
  let service: Bibliotecas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bibliotecas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
