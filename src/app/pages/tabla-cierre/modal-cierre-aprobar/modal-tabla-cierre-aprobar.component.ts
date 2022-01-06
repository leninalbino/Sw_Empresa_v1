import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { TablaCierre } from 'src/app/model/tabla-cierre';
import { TablaDetalle } from 'src/app/model/tabla-detalle';
import { TablaCierreService } from 'src/app/services/tabla-cierre.service';
import { ModalTablaDetalleComponent } from '../modal-detalle-eliminar/modal-tabla-detalle.component';

@Component({
  selector: 'app-modal-tabla-cierre-aprobar',
  templateUrl: './modal-tabla-cierre-aprobar.component.html',
  styleUrls: ['./modal-tabla-cierre-aprobar.component.css']
})
export class ModalTablaCierreAprobarComponent implements OnInit {

    datosNuevos: TablaCierre;
    date: Date = new Date();
    //CierreService: any;
    constructor(
      private dialogRef: MatDialogRef<ModalTablaCierreAprobarComponent>,
      @Inject(MAT_DIALOG_DATA)private data: TablaCierre,
       private servicio: TablaCierreService,

      ) { }

  ngOnInit(): void {
      this.datosNuevos = {...this.data};
      //console.log(this.datosNuevos)
    }
    EliminarCabXDeta(){
      this.servicio.eliminarCiec("0001", this.datosNuevos.cl_asien).pipe(switchMap(() =>{
   return this.servicio.listaCiec('0001','');
      }))
      .subscribe(data =>{
        this.servicio.setMensajeCambio("SE ELIMINO CORRECTAMENTE");
        this.servicio.settabCieCambio(data)
        console.log(data)
      });
      this.cerrar();
    }
      cerrar() {
        this.dialogRef.close();
      }

      // este metodo es para que refreque automaticamente la pagina al eliminar
      // luego tienen que llamar en el htmal modal-tabla-cierre
      refresh(): void { window.location.reload();
      }



}
