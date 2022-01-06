import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TablaCierre } from 'src/app/model/tabla-cierre';
import { TablaDetalle } from 'src/app/model/tabla-detalle';
import { TablaCierreService } from 'src/app/services/tabla-cierre.service';
import { TablaDetalleServiceService } from 'src/app/services/tabla-detalle-service.service';
import { ModalCierreEdicionComponent } from '../modal-cierre-edicion/modal-cierre-edicion.component';

@Component({
  selector: 'app-modal-detalle-vista',
  templateUrl: './modal-detalle-vista.component.html',
  styleUrls: ['./modal-detalle-vista.component.css']
})
export class ModalDetalleVistaComponent implements OnInit {


  displayedColumns=['dl_secue', 'dl_tipope', 'dl_ctasal','dl_ctatra'];
  dataSourceDetVista: MatTableDataSource<TablaDetalle>

  datosNuevos: TablaCierre;
  datosNuevos2: TablaCierre;

  datosDetalles:TablaDetalle[];

  @ViewChild(MatPaginator)paginator:MatPaginator;
  @ViewChild(MatSort)sort:MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TablaCierre, // injectamos la data al modal
    @Inject(MAT_DIALOG_DATA) private data2: TablaDetalle,
    private dialogRef:MatDialogRef<ModalDetalleVistaComponent>,
    private tablaDetalleServiceSe: TablaDetalleServiceService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {

    this.datosNuevos={...this.data['principal']};

    this.datosNuevos2={...this.data['secundario']};

    this.datosDetalles={...this.data2['secuendario']}

    this.tablaDetalleServiceSe.gettabCieCambio().subscribe (data=>{
console.log(this.data2)
    });
    // console.log(this.datosNuevos2.cl_asien)
    /**
     * Este funcion lista los datos del detalle comparando el id de la cabecera y el id del detalle
     */
    this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosNuevos2.cl_asien).subscribe(data=>{
      this.crearTablaDetaVista(data);
      //this.arregloDetalle=data;
    //console.log(data)
    })


  }
  filtrar(e: any) {
    this.dataSourceDetVista.filter = e.target.value.trim().toLowerCase();
  }

    abrirModalCuenta($event){
      console.log($event);
    }
    /**
     *Crea la tabla en el modal de vista
    * @param dataDeta
    */
    crearTablaDetaVista(dataDeta: TablaDetalle[]) {

      this.dataSourceDetVista = new MatTableDataSource(dataDeta);
      this.dataSourceDetVista.paginator = this.paginator;
      this.dataSourceDetVista.sort = this.sort;
      //this.dataSourceDet.hidePageSize = true;

    }

    cerrar() {
      this.dialogRef.close();
    }

}
