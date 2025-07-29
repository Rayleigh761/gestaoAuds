import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBase } from '../../../../shared/base/http-base';
import { FormularioCompleto } from '../../models/formulario-dados';

@Injectable({
  providedIn: 'root'
})
export class FormularioService extends HttpBase {
  
  private endpoint = 'advice';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getCategoriasPeloId(id: number): Observable<any> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  enviarFormulario(payLoad: FormularioCompleto): Observable<any> {
    return this.httpPost(`${this.endpoint}`, payLoad);
  }

}
