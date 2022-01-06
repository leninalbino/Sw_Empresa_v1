import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { TablaCierre } from '../model/tabla-cierre';
import { TablaDetalle } from '../model/tabla-detalle';
import { GenericService } from './generic.service';


const baseUrlCrud = 'http://localhost:8076/rest/lcociec/';
@Injectable({
  providedIn: 'root'
})
export class TablaCierreService extends GenericService <TablaCierre>{
private tabCieCambio= new Subject<TablaCierre[]>();
private mensajeCierre= new Subject<string>();

  constructor(protected http:HttpClient) {
    super(http,`http://localhost:8076/rest/lcociec`);
   }
   setMensajeCambio(mensaje: string) {
    this.mensajeCierre.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCierre.asObservable();
  }

  settabCieCambio(lista: TablaCierre[]) {
    this.tabCieCambio.next(lista);
  }

  gettabCieCambio() {
    return this.tabCieCambio.asObservable();
  }
  //listDetByCab(cia:string, tip_asie:string):Observable<TablaDetalle[]>{
   // return this.http.get<TablaDetalle[]>("http://localhost:8076/rest/lcocied/listarlcocied/listDetXCab/"+cia+"/"+tip_asie)
    //http://localhost:8076/rest/lcocied/listarlcocied/listDetXCab/0001/03
  //}

  listaCiec(Cia:String, tip_asie:string ): Observable<TablaCierre[]>{
    return this.http.get<TablaCierre[]>(baseUrlCrud+"listarlcociec/"+Cia+"/"+tip_asie);
  }
  //listaDetalle(cia:string, tip_asie:string):Observable<TablaDetalle[]>{
    //return this.http.get<TablaDetalle[]>(baseUrlCrud+"listarlcocied"+cia+"/"+tip_asie)
  //}

  // Metodo de Eliminar Cabecera
  eliminarCiec(cia:string, tip_asie:string): Observable<any>{
    const params = new HttpParams()
    .set("p_ciacont", cia)
    .set("cl_asien", tip_asie)
    return this.http.delete(baseUrlCrud+"elimCabDet/"+cia+"/"+tip_asie);
  }


  registrarCiec(t : TablaCierre):any {
    return this.http.post(baseUrlCrud+'registrarlcociec/0001',t);
  }

  ActualizaCiec(t: TablaCierre) {
    return this.http.put(baseUrlCrud+'actulcociec/0001',t);
  }
  listarArregloPorCodigo(codigo: string): Observable<TablaCierre[]>{
    return this.http.get<TablaCierre[]>(baseUrlCrud+`listarlcociec/0001/`+codigo)
  }



}
