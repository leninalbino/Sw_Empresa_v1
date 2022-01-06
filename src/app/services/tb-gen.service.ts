import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
//Principio
import { TbGenModel } from '../model/tb-gen-model';
import { TbGenGeneric } from './tb-gen-generic.service';



@Injectable({
  providedIn: 'root'
})
export class TbGen extends TbGenGeneric<TbGenModel>{
  private tabNumCambio = new Subject<TbGenModel[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http,`${environment.HOST}/rest/lcgen`);
  }

  /* get, set */
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  settabNumCambio(lista: TbGenModel[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }
}
