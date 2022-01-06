import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//importante
import { TablaCierreService } from 'src/app/services/tabla-cierre.service';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { findIndex } from 'rxjs/operators';
import { TablaCierre } from 'src/app/model/tabla-cierre';
import { ModalTablaCierreAprobarComponent } from './modal-cierre-aprobar/modal-tabla-cierre-aprobar.component';
import { ModalCierreEdicionComponent } from './modal-cierre-edicion/modal-cierre-edicion.component';
import { TablaDetalle } from 'src/app/model/tabla-detalle';
import { TablaDetalleServiceService } from 'src/app/services/tabla-detalle-service.service';
import { ModalDetalleVistaComponent } from './modal-detalle-vista/modal-detalle-vista.component';

@Component({
  selector: 'app-tabla-cierre',
  templateUrl: './tabla-cierre.component.html',
  styleUrls: ['./tabla-cierre.component.css']
})

export class TablaCierreComponent implements OnInit
{


    displayedColumns: String[]=['cl_asien', 'cl_descr', 'acciones'];
    dataSource: MatTableDataSource<TablaCierre>;
    //dataSource2: MatTableDataSource<TablaDetalle>; // los datos que se va alcenar en la tabla
    datadetalle:MatTableDataSource<TablaDetalle>;
    @ViewChild(MatPaginator)paginator:MatPaginator;
    @ViewChild(MatSort)sort:MatSort;

    constructor(
      private tablaCierreService: TablaCierreService,
      private tablaDetalleService: TablaDetalleServiceService,

      private dialog: MatDialog,
      private snackBar:MatSnackBar,
    ) { }

    ngOnInit(): void
    {
      this.tablaCierreService.gettabCieCambio().subscribe (data=>{

      });

        // mensaje al hacer una accion
        this.tablaCierreService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data,'Aviso',{duration:2000})
        });

        this.tablaCierreService.listaCiec('0001','').subscribe(data =>{
        // console.log(data);
          //console.log(data[0].cl_asien);
          //console.log(data[0].cl_descr);
          this.crearTabla(data);

        });



    }
    filtrar(e: any) {
      this.dataSource.filter = e.target.value.trim().toLowerCase();
    }

    onChange() {
      // console.log(centroId); // Aquí iría tu lógica al momento de seleccionar algo
      this.tablaCierreService.listaCiec('0001','').subscribe(data => {
        // console.log(this.date.getUTCMonth())
        this.crearTabla(data);

      });
    }

      /**
       *Esta funcion crea la tabla en al cargar la pagina
      * @param data
      */
      crearTabla(data: TablaCierre[]) {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator.hidePageSize = true;
      }

      /**
       *esta funcion abre el modal de confirmacion para eliminar
      * @param tablaCierre
      */
      eliminar(tablaCierre:TablaCierre[]){
        this.dialog.open(ModalTablaCierreAprobarComponent,{
          width: '400px',
          data: tablaCierre

        })

    }
    /**
     *Esta funcion abre el modal de edicion
    * @param tablaCierre
    */
    abrirDialogo(tablaCierre?:TablaCierre)
    {
      //console.log(tablaCierre)
      this.tablaCierreService.listarArregloPorCodigo(tablaCierre.cl_asien).subscribe((data)=>{
        this.dialog.open(ModalCierreEdicionComponent, {
          width: '100%',
            height:'100%',
          disableClose:true,
          data:{
            principal:data,
            secundario:tablaCierre
          }
        });
      });
    }

    abrirDialogo2(tablaCierre?:TablaCierre)
    {
      //console.log(tablaCierre)
      this.tablaCierreService.listarArregloPorCodigo(tablaCierre.cl_asien).subscribe((data)=>{
        this.dialog.open(ModalCierreEdicionComponent, {
          width: '100%',
            height:'100%',
          disableClose:true,
          data:{
            
          }
        });
      });
    }

    /**
   * Esta funcion es para abrir el modal de la vista
   */
    abrirDialogoVista(tablaCierre: TablaCierre):any
    {
      //console.log(tablaCierre)
      this.tablaDetalleService.listarDetXCab('0001',tablaCierre.cl_asien).subscribe((data)=>{
        this.dialog.open(ModalDetalleVistaComponent, {
          width: '650px',
          data:{
            principal:data,
            secundario:tablaCierre
          }

        });
        console.log(data)
      });
    }




}
