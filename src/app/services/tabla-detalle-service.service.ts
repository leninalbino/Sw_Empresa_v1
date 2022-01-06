import { Inject,Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TablaDetalle } from '../model/tabla-detalle';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment.prod';



const urlDeta = 'http://localhost:8076/rest/lcocied';

@Injectable({
  providedIn: 'root'
})
export class TablaDetalleServiceService  {

  private tabCieCambio= new Subject<TablaDetalle[]>();
  private mensajeCierre= new Subject<string>();
  constructor(protected http: HttpClient) {
    //super(http,'http://localhost:8076/rest/lcocied')
  }
  setMensajeCambio(mensaje: string) {
    this.mensajeCierre.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCierre.asObservable();
  }

  settabCieCambio(lista: TablaDetalle[]) {
    this.tabCieCambio.next(lista);
  }

  gettabCieCambio() {
    return this.tabCieCambio.asObservable();
  }

  listarDetXCab(cia:string, DetCod:string) {
    return this.http.get<TablaDetalle[]>(urlDeta+"/listarlcocied/listDetXCab/"+cia+"/"+DetCod);
    // return 'Hola';
  }
  //listDetByCab(cia:string, tip_asie:string):Observable<TablaDetalle[]>{
   // return this.http.get<TablaDetalle[]>("http://localhost:8076/rest/lcocied/listarlcocied/listDetXCab/"+cia+"/"+tip_asie)
    //http://localhost:8076/rest/lcocied/listarlcocied/listDetXCab/0001/03
// }
listarDetalle(cia:string, asient:string, secue:string):Observable<TablaDetalle>{
  return this.http.get<TablaDetalle>(urlDeta+"/listarlcocied/"+cia+"/"+asient+"/"+secue);
}

updateDetalle(cia: string, tDeTalle:TablaDetalle){
  return this.http.put(urlDeta+'/actulcocied/'+cia,tDeTalle);
}

//Metodo de eliminar detalle
  eliminarDetalle( tip_asie:string, tip_sec: string):any{
    const params = new HttpParams()
    .set("dl_asien", tip_asie)
    .set("dl_secue",tip_sec)
    return this.http.delete(urlDeta+"/elimRegistro/0001"+"/"+tip_asie+"/"+tip_sec);
  }

  registrarDetalle(cia:string, tDeTalle:TablaDetalle){
return this. http.post(urlDeta+"/registralcocied/"+"/"+cia+"/",tDeTalle)
  }

}
