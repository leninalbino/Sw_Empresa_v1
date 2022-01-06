import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';


import { TablaNumeracion } from 'src/app/model/tabla-numeracion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablaNumeracionService } from 'src/app/services/tabla-numeracion.service';
import { environment } from 'src/environments/environment';


// import { TablaNumeracion } from 'src/app/model/tabla-numeracion';

@Component({
  selector: 'app-modal-tab-num',
  templateUrl: './modal-tab-num.component.html',
  styleUrls: ['./modal-tab-num.component.css']
})
export class ModalTabNumComponent implements OnInit {

  datosNuevos: TablaNumeracion;
  datosNuevos2: TablaNumeracion;
  date: Date = new Date();
  datosReg:TablaNumeracion;
  public form:FormGroup;
  private environment;

  constructor(
    private dialogRef: MatDialogRef<ModalTabNumComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TablaNumeracion,
    private servivio: TablaNumeracionService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.datosNuevos = { ...this.data['principal'] };
    this.datosNuevos2 = { ...this.data['secundario'] };
   
    console.log(this.datosNuevos)
    this.form=this.formBuilder.group({
      tex_nl_subdia:['',Validators.required],
      subdiario:['',Validators.required]
    })
  }

  operar() {
    this.datosReg={
        // "pkID": {
        //     "nl_subdia":"08",
        //     "nl_anio": "2021",
        //     "nl_mes": "06"
        // },
        // "nl_nume":100,
        // "nl_usrcrea":"",
        // "nl_feccrea":"",
        // "nl_hracrea":"",
        // "nl_usract":"",
        // "nl_fecact":"",
        // "nl_hraact":""
    
      "pkID": {
          "nl_subdia":`${this.datosNuevos[0].pkID.nl_subdia}`,
          "nl_anio":`${this.datosNuevos[0].pkID.nl_anio}`,
          "nl_mes":`${this.datosNuevos[0].pkID.nl_mes}`
      },
      "nl_nume":this.form.value.tex_nl_subdia*1,
      "nl_usrcrea":"",
      "nl_feccrea":"",
      "nl_hracrea":"",
      "nl_usract":"",
      "nl_fecact":"",
      "nl_hraact":""
  }
      //MODIFICAR
      this.servivio.modificar(this.datosReg).pipe(switchMap((data2) => {
        console.log(data2)
        return this.servivio.listarPor(`${this.datosNuevos[0].pkID.nl_anio}`,`${this.datosNuevos[0].pkID.nl_mes}`);
      }))
        .subscribe(data => {
          this.servivio.settabNumCambio(data);
          this.servivio.setMensajeCambio("Actualizado");
          console.log(this.datosReg)
        });

    
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
