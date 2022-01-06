import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
//Principio
import { TablaMtoCta } from '../model/tabla-mto-cta';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class TablaMtoCtaService extends GenericService<TablaMtoCta>{
  private tabNumCambio = new Subject<TablaMtoCta[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http,`${environment.HOST}/rest/lcopcta`); //
  }

  /* get, set */
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  settabNumCambio(lista: TablaMtoCta[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }

  getFiltroCta(codigo: string){
      return this.http.get<TablaMtoCta[]>(this.url+'/ListarCtas/0001/'+codigo);
  }
}
