import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Anexo } from 'src/app/model/Anexo';
import { AnexoService } from 'src/app/services/anexo.service';
import { datosCargar } from 'src/environments/environment';
import { ModalNumeAprobarComponent } from '../../tabla-numeracion/modal-nume-aprobar/modal-nume-aprobar.component';

@Component({
  selector: 'app-modal-anexo-aprobar',
  templateUrl: './modal-anexo-aprobar.component.html',
  styleUrls: ['./modal-anexo-aprobar.component.css']
})
export class ModalAnexoAprobarComponent implements OnInit {

  datosNuevos: Anexo;
  date: Date = new Date();
  AnexoService: any;
  constructor(
    private dialogRef: MatDialogRef<ModalNumeAprobarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Anexo,
    private servicio: AnexoService
  ) {}

  ngOnInit(): void {
    this.datosNuevos = { ...this.data};
    console.log(this.datosNuevos)
  }
  operar() {
   this.servicio.eliminarAnexo("0001",this.datosNuevos.pkID.al_tipanex,this.datosNuevos.pkID.al_codanex) .pipe(switchMap(() => {
     
    return this.servicio.listaAnexos('0001','','');
  }))
    .subscribe(data => {
      
      this.servicio.setMensajeCambio("SE ELIMINO");
      this.servicio.settabNumCambio(data);
      console.log(data)
      
    });
  this.cerrar();
  
  }

  cerrar() {
    this.dialogRef.close();
  }
}