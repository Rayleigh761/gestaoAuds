import { TestBed } from '@angular/core/testing';

import { FormularioService } from './formulario';

describe('Formulario', () => {
  let service: FormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
