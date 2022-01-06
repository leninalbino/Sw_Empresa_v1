import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { TbCaja } from 'src/app/model/tabla-caja';
import { TbGenModel } from 'src/app/model/tb-gen-model';
import { TablaCajaService } from 'src/app/services/tabla-caja.service';
import { TbGen } from 'src/app/services/tb-gen.service';

@Component({
  selector: 'app-modal-vista',
  templateUrl: './modal-vista.component.html',
  styleUrls: ['./modal-vista.component.css']
})
export class ModalVistaComponent implements OnInit {

  datosNuevos: TbCaja;
  datosNuevos2: TbCaja;
  datosReg:TbCaja;
  public form:FormGroup;
  private environment;
  datosCombo;
  options: TbGenModel[];
  seleccionada: string;
  dataFinal: TbCaja;
  bandera: boolean = true;

  codigo_caja: string;
  nombre_Caja: string;


  constructor(private dialogRef: MatDialogRef<ModalVistaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TbCaja,
    private servivio: TablaCajaService,
    private formBuilder:FormBuilder,

    
    private servicioTablaGeneral: TbGen) { }

  ngOnInit(): void {
    this.datosNuevos = { ...this.data['principal'] };
    this.datosNuevos2 = { ...this.data['secundario'] };

    this.servicioTablaGeneral.listarPorCodigoTabla("03").subscribe((data)=>{
      this.datosCombo = data;
      console.log(data);
      console.log(this.datosCombo[0].pkID.tl_clave);
      this.options = this.datosCombo;
      this.seleccionada = this.datosCombo[0].pkID.tl_Clave;
    });

    this.dataFinal = this.datosNuevos;
    console.log(this.datosNuevos);
    console.log(this.datosNuevos2);

    this.codigo_caja = this.datosNuevos[0].bl_codbco;
    console.log(this.datosNuevos[0].bl_codbco);
    
    this.form=this.formBuilder.group({
      desc_caja:[this.datosNuevos[0].bl_nombco,Validators.required],
      tipo_moneda:[this.datosNuevos[0].bl_tipmon,Validators.required],
      cuenta:[this.datosNuevos[0].bl_cuenta,Validators.required]
    })
  }

  operar() {
    this.datosReg={
      bl_codbco: `${this.datosNuevos[0].bl_codbco}`,
      bl_nombco: this.form.value.desc_caja,
      bl_tipmon: this.form.value.tipo_moneda,
      "bl_numcta": "0004",
      "bl_estado": "A",
      bl_cuenta: this.form.value.cuenta,
      "bl_desccta":"Cuenta contable",
      "bl_entfina": "BCP",
      "bl_tipocta":"A",
      "bl_flcaja": "S",
      "bl_fche1":"",
      "bl_fche2":"",
      "bl_fche3":"",
      "bl_nche1": "",
      "bl_nche2": "",
      "bl_nche3": "",
      "bl_frche": "",
      "bl_modesdcta":"",
      "bl_usrcrea":"JOSEPH",
      "bl_feccrea":"",
      "bl_hracrea":"",
      "bl_usract":"",
      "bl_fecact":"",
      "bl_hraact":""
    }

    //MODIFICAR
    this.servivio.modificarCaja(this.datosReg).pipe(switchMap((data2) => {
      console.log(data2);
      return this.servivio.listar();
    }))
      .subscribe(data => {
        this.servivio.settabNumCambio(data);
        this.servivio.setMensajeCambio("Actualizado");
        console.log(this.datosReg);
      });

  
      this.cerrar();
      
  }

  cerrar() {
    this.dialogRef.close();
  }

}
