import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Anexo } from '../model/Anexo';

import { GenericService } from './generic.service';

const baseUrlCrud = 'http://localhost:8076/rest/lcoAnex/';

@Injectable({
  providedIn: 'root'
})

export class AnexoService extends GenericService<Anexo>{
  private tabNumCambio = new Subject<Anexo[]>();
  private mensajeCambio = new Subject<string>();


  constructor(protected http: HttpClient) {
    super(http,`http://localhost:8076/rest/lcoAnex/`);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  settabNumCambio(lista: Anexo[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }

  listaAnexos(Cia:String, tipo_Anex:string,cod_anex:string ): Observable<Anexo[]>{
    return this.http.get<Anexo[]>(baseUrlCrud+"ListarAnex/"+Cia+"/"+tipo_Anex+"/"+cod_anex);
  }

  eliminarAnexo(cia:string, tip_Anex:string, cod_Anex:string): Observable<any>{
    const params = new HttpParams()
    .set("p_ciacont", cia)
    .set("al_tipanex", tip_Anex)
    .set("al_codanex", cod_Anex);

    return this.http.delete(baseUrlCrud+"EliminaAnex/"+cia+"/"+tip_Anex+"/"+cod_Anex);
  }

  registrarAnexo(t: Anexo, cia : String) {
    return this.http.post(baseUrlCrud+'/CreaAnex/'+cia,t);
  }

  ActualizaAnexo(t: Anexo, cia : String) {
    return this.http.put(baseUrlCrud+'/ActuAnex/'+cia,t);
  }

}
