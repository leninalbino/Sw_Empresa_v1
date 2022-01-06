import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
//Principio
import { TablaNumeracion } from '../model/tabla-numeracion';
import { GenericService } from './generic.service';



@Injectable({
  providedIn: 'root'
})
export class TablaNumeracionService extends GenericService<TablaNumeracion>{
  private tabNumCambio = new Subject<TablaNumeracion[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http,`${environment.HOST}/rest/lconume`);
  }

  /* get, set */
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  settabNumCambio(lista: TablaNumeracion[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }
}
