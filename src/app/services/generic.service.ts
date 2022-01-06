import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http: HttpClient,
    @Inject("url") protected url: string
  ) { }

  listar(){
    return this.http.get<T[]>(this.url+'/Listarlconume/0001');
  }
  listarPor(anio:string, mes:string){
    return this.http.get<T[]>(`${this.url}/Listarlconume/0001/${anio}/${mes}`);
  }
  listarSubDia(){
    // return this.http.get<T[]>(`${this.url}/Listarlconume/0001/${anio}/${mes}`);
  }

  listarPorId(id1: string, id2: string, id3: string) {
    return this.http.get<T>(`${this.url}/Listarlconume/0001/${id1}/${id2}/${id3}`);
  }
  listarPorPK(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  registrar(t: T) {
    return this.http.post(this.url+'/registraNume/0001', t);
  }

  modificar(t: T) {
    return this.http.put(this.url+'/actuTablaNume/0001', t);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  eliminarRegTablaNume(nl_subdia:string,nl_anio:string, nl_mes:string ){
    return this.http.delete(`${this.url}/elimTablaNume/0001/${nl_subdia}/${nl_anio}/${nl_mes}`);
  }
}
