import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TbCaja } from '../model/tabla-caja';
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TablaCajaService extends GenericService<TbCaja>{

  private tabNumCambio = new Subject<TbCaja[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http,`${environment.HOST}/rest/lcobanc`);
  }

  /* get, set */
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  settabNumCambio(lista: TbCaja[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }

  registrarCaja(tCaja: TbCaja){
    return this.http.post(`${this.url}/registraBco/0001`, tCaja);
  }

  modificarCaja(tCaja: TbCaja){
    return this.http.put(`${this.url}/actuTablaCaj/0001`, tCaja);
  }

  listarArregloPorcodigo(codigo: string){
    return this.http.get<TbCaja[]>(`${this.url}/listarCaj/0001/${codigo}`)
  }
}
