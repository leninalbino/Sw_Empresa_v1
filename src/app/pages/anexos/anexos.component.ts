import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


//importante
import { TablaNumeracion } from 'src/app/model/tabla-numeracion';
import { TablaNumeracionService } from 'src/app/services/tabla-numeracion.service';
import { AnexoService } from 'src/app/services/anexo.service';

import { datosCargar } from 'src/environments/environment';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Anexo } from 'src/app/model/Anexo';
import { findIndex } from 'rxjs/operators';
import { ModalNumeAprobarComponent } from '../tabla-numeracion/modal-nume-aprobar/modal-nume-aprobar.component';
import { ModalAnexoAprobarComponent } from './modal-anexo-aprobar/modal-anexo-aprobar.component';
import { ModalAnexoEdicionComponent } from './modal-anexo-edicion/modal-anexo-edicion.component';


@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css']
})
export class AnexosComponent implements OnInit {

  displayedColumns = [ 'Tipo', 'Anexo', 'Descripción de anexo', 'Tip. Doc.', 'Nro. Doc','Estado','acciones'];
  // displayedColumns = ['id', 'anio', 'mes', 'subdiario', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Anexo>;
  //date: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tablaNumeracionService: TablaNumeracionService,
    private AnexoService: AnexoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
   
    
    this.AnexoService.gettabNumCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.AnexoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.AnexoService.listaAnexos('0001','','').subscribe(data => {
      
      this.crearTabla(data);
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }
  onChange() {
    // console.log(centroId); // Aquí iría tu lógica al momento de seleccionar algo
    this.AnexoService.listaAnexos('0001','','').subscribe(data => {
      // console.log(this.date.getUTCMonth())
      this.crearTabla(data);
      
    });
}
  crearTabla(data: Anexo[]) {
    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  abrirDialogo(anexo?: Anexo) {
    let urlTest = this.AnexoService.listaAnexos('0001',anexo.pkID.al_tipanex,anexo.pkID.al_codanex)
    urlTest.subscribe(data2 => {
      this.dialog.open(ModalAnexoEdicionComponent, {
        width: '800px',
        height: '1500px',
        
        data: {
           principal:data2,
           
           
          }
      });
    });
  }
  
  abrirDialogoView(anexo?: Anexo) {
    let urlTest = this.AnexoService.listaAnexos('0001',anexo.pkID.al_tipanex,anexo.pkID.al_codanex)
    urlTest.subscribe(data2 => {
      // console.log(data2);
      this.dialog.open(ModalAnexoEdicionComponent, {
        width: '800px',
        height: '1500px',
        
        data: {
           principal:data2,
           secundario: data2,
           
          }
      });
    });
  }
  
 abrirDialogoNuevo(anexo?: Anexo) {
    this.AnexoService.listaAnexos('0001','x','x').subscribe(rest => {
      
      this.dialog.open(ModalAnexoEdicionComponent, {
        width: '800px',
        height: '1500px',
        data: {
          principal:rest,
         
          
        }
        
      });
    });
    
  }
  
  eliminar(Anexo: Anexo) {
    this.dialog.open(ModalAnexoAprobarComponent, {
      width: '400px',
      data: Anexo
    });
    
  }

  

}