import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TbCaja } from 'src/app/model/tabla-caja';
import { TablaMtoCta } from 'src/app/model/tabla-mto-cta';
import { TbGenModel } from 'src/app/model/tb-gen-model';
import { TablaCajaService } from 'src/app/services/tabla-caja.service';
import { TablaMtoCtaService } from 'src/app/services/tabla-mto-cta';
import { TbGen } from 'src/app/services/tb-gen.service';
import { ModalCuentaComponent } from '../modal-cuenta/modal-cuenta.component';

@Component({
  selector: 'app-modal-agregar',
  templateUrl: './modal-agregar.component.html',
  styleUrls: ['./modal-agregar.component.css']
})
export class ModalAgregarComponent implements OnInit {

  public form:FormGroup;
  options: TbGenModel[];
  datosNuevos: TbCaja;
  datosCombo;
  seleccionada: string;
  datosReg: TbCaja;
  cuentaFiltro: string='';

  codigoCajaValida :boolean;
  descripcionCajaValida:boolean;
  tipoMonedaCajaValida:boolean;
  cuentaCajaValida:boolean ;


  constructor(private dialogRef: MatDialogRef<ModalAgregarComponent>,private dialog: MatDialog,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: TbCaja,
    private servicioTablaCaja: TablaCajaService,
    private servicioTablaGeneral: TbGen,
    private servicioTablaCta: TablaMtoCtaService) { }

  ngOnInit(): void {
    this.datosNuevos = { ...this.data };

    this.servicioTablaGeneral.listarPorCodigoTabla("03").subscribe((data)=>{
      this.datosCombo = data;
      console.log(this.datosCombo[0].tl_descri);
      this.options = this.datosCombo;
      this.seleccionada = this.datosCombo[0].tl_descri;
    })

    this.form=this.formBuilder.group({
      codigo_caja:['',Validators.required],
      desc_caja:['',Validators.required],
      tipo_moneda:['',Validators.required],
      cuenta:['',Validators.required]
    })

  }

  abrirModalCuenta(cuenta?:TablaMtoCta){
    this.servicioTablaCta.getFiltroCta(this.cuentaFiltro).subscribe((data2)=>{
      console.log(data2);
      this.dialog.open(ModalCuentaComponent, {
        width:'650px',
        height:'650px',
        data: data2
      });
    });
    
  }


  operar(){
    this.datosReg={
      bl_codbco: `${this.form.value.codigo_caja}`,
      bl_nombco: `${this.form.value.desc_caja}`,
      bl_tipmon: `${this.form.value.tipo_moneda}`,
      "bl_numcta": "0004",
      "bl_estado": "A",
      bl_cuenta: `${this.form.value.cuenta}`,
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

    this.codigoCajaValida = this.form.value.codigo_caja == '' ?  true : false; 
    this.descripcionCajaValida = this.form.value.desc_caja == '' ?  true : false; 
    this.tipoMonedaCajaValida = this.form.value.tipo_moneda == '' ?  true : false; 
    this.cuentaCajaValida = this.form.value.cuenta == '' ?  true : false; 


    
    if(this.form.valid){
    this.servicioTablaCaja.registrarCaja(this.datosReg).subscribe((data2)=>{
      this.servicioTablaCaja.listar().subscribe((data)=>{
        this.servicioTablaCaja.settabNumCambio(data);
        console.log(data2);
          this.servicioTablaCaja.setMensajeCambio(data2['mensaje']+"");
      })
    });

    this.cerrar();

  }else{
    console.log("Formulario invalido");
  }
  
}

  cerrar() {
    this.dialogRef.close();
  }

}
