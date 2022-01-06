import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';


import { TablaNumeracion } from 'src/app/model/tabla-numeracion';
import { TablaNumeracionService } from 'src/app/services/tabla-numeracion.service';
import { datosCargar } from 'src/environments/environment';


@Component({
  selector: 'app-modal-nume-aprobar',
  templateUrl: './modal-nume-aprobar.component.html',
  styleUrls: ['./modal-nume-aprobar.component.css']
})
export class ModalNumeAprobarComponent implements OnInit {
  datosNuevos: TablaNumeracion;
  date: Date = new Date();
  constructor(
    private dialogRef: MatDialogRef<ModalNumeAprobarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TablaNumeracion,
    private servicio: TablaNumeracionService
  ) {}

  ngOnInit(): void {
    this.datosNuevos = { ...this.data};
    console.log(this.datosNuevos)
  }
  operar() {
   this.servicio.eliminarRegTablaNume(this.datosNuevos[0],this.datosNuevos[3],this.datosNuevos[4]).pipe(switchMap(() => {
      return this.servicio.listarPor(`${this.date.getFullYear()}`,`${datosCargar.mesCambios}`);
    }))
      .subscribe(data => {
        this.servicio.setMensajeCambio("SE ELIMINO");
        this.servicio.settabNumCambio(data);
        window.alert("Se elimino correctamente GIL")
      });
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
