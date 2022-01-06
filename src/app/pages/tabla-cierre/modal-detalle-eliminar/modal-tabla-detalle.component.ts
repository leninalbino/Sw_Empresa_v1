import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { TablaCierre } from 'src/app/model/tabla-cierre';
import { TablaDetalle } from 'src/app/model/tabla-detalle';
import { TablaDetalleServiceService } from 'src/app/services/tabla-detalle-service.service';

@Component({
  selector: 'app-modal-tabla-detalle',
  templateUrl: './modal-tabla-detalle.component.html',
  styleUrls: ['./modal-tabla-detalle.component.css']
})
export class ModalTablaDetalleComponent implements OnInit {

datosNuevosDetalle: TablaDetalle;
datosNuevosDetalle2:TablaCierre;

  constructor(
    private dialogoRef:MatDialogRef<ModalTablaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) private data:TablaDetalle,
    private servicioDeta:TablaDetalleServiceService
  ) { }

  ngOnInit(): void {
    this.datosNuevosDetalle={...this.data['principal']};
    this.datosNuevosDetalle2={...this.data['secundario']};

    //console.log(this.datosNuevosDetalle)

  }
/**
 * Esta funcion es para eliminar los detalles del modal Editar cabecera-detalle
 */
  eliminadDeta(){
    //console.log(this.datosNuevosDetalle.pk.dl_asien)
    this.servicioDeta.eliminarDetalle(this.datosNuevosDetalle[4],this.datosNuevosDetalle[0]).pipe(switchMap(()=>{
      //console.log(this.servicioDeta.eliminarDetalle)
      return this.servicioDeta.listarDetXCab('0001',this.datosNuevosDetalle2.cl_asien);

    }))
    .subscribe(data =>{
     this.servicioDeta.setMensajeCambio("SE ELIMINO CORRECTAMENTE");
      this.servicioDeta.settabCieCambio(data);
      console.log(data)
    });
  this.cerrar();

}
  cerrar() {
    this.dialogoRef.close();
  }

  // este metodo es para que refreque automaticamente la pagina al eliminar
  // luego tienen que llamar en el htmal modal-tabla-cierre
  //refresh(): void { window.location.reload(); }

}
