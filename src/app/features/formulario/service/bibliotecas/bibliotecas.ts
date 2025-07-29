import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBase } from '../../../../shared/base/http-base';

@Injectable({
  providedIn: 'root'
})
export class Bibliotecas extends HttpBase {
  
  private url = 'api/biblioteca';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getBibFalarSobre(): Observable<any> {
    return this.httpGet(`${this.url}/falar-sobre`);
  }

}
