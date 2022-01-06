import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { TbCaja } from 'src/app/model/tabla-caja';
import { TablaCajaService } from 'src/app/services/tabla-caja.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  datosNuevos: TbCaja;

  constructor(private dialogRef: MatDialogRef<ModalEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TbCaja,
    private servicio :TablaCajaService) { }

  ngOnInit(): void {
    this.datosNuevos = {...this.data};
    console.log(this.datosNuevos);
  }

  operar(){
    this.servicio.eliminar(this.datosNuevos[0]).pipe(switchMap(()=>{
      return this.servicio.listar();
    }))
    .subscribe(data=>{
      this.servicio.setMensajeCambio("Se elimina la caja");
      this.servicio.settabNumCambio(data);
    });
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

}
