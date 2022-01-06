import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Anexo } from 'src/app/model/Anexo';
import { TbGenModel } from 'src/app/model/tb-gen-model';
import { AnexoService } from 'src/app/services/anexo.service';
import { TbGen } from 'src/app/services/tb-gen.service';
import { datosCargar } from 'src/environments/environment';
import { UbigeoAyudaComponent } from '../ubigeo-ayuda/ubigeo-ayuda.component';


@Component({
  selector: 'app-modal-anexo-edicion',
  templateUrl: './modal-anexo-edicion.component.html',
  styleUrls: ['./modal-anexo-edicion.component.css']
})
export class ModalAnexoEdicionComponent implements OnInit {

  myControl = new FormControl();
  options: TbGenModel[];
  filteredOptions: Observable<TbGenModel[]>;

  //Traidos del dash
  datosNuevos: Anexo[];
  date: Date = new Date();
  datosReg:Anexo;
  view:Anexo;


 //comboBox
  datosCombo;
  datosCombo2;


  anexo: Anexo;
  //Anexo atributos
  RazSoc:string;
  Estado:string;
  TipDoc:string;
  tipoAnex: string;
  CodAnex:string;
  Nacion:string;
  TipDet:string;
  TipoPersona:string;
  NumDoc:string;


  //Hidden
  Persona:boolean = false;
  Boton:boolean=false;

  public form:FormGroup;
  submitted: boolean;


  constructor( private dialogRef: MatDialogRef<ModalAnexoEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Anexo,
    private servicio: AnexoService,
    private servicioTbGen:TbGen,
    private dialog:MatDialog,
    private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
     //Objetos traidos de edit o view
      this.datosReg = { ...this.data['principal'] };
      this.view = { ...this.data['secundario'] };


      //Combo box tipo anexo
      this.servicioTbGen.listarTablas('0001','07','').subscribe(data=> {
      this.datosCombo=data;

      this.options= this.datosCombo;
      this.tipoAnex= this.datosCombo[0].pkID.al_tipanex;


      //Setear campos en caso sea edicion o detallado
      if(this.datosReg[0] != undefined ){

        this.form.get('tipoAnex').setValue(this.datosReg[0].pkID.al_tipanex)
        this.form.get('CodAnex').setValue(this.datosReg[0].pkID.al_codanex)
        this.form.get('TipoPer').setValue(this.datosReg[0].al_tipper)
        this.form.get('RazSoc').setValue(this.datosReg[0].al_razsoc)
        this.form.get('RazSoc2').setValue(this.datosReg[0].al_razsoc2)
        this.form.get('Direcc').setValue(this.datosReg[0].al_direcc)
        this.form.get('ApePat').setValue(this.datosReg[0].al_apelpat)
        this.form.get('ApeMat').setValue(this.datosReg[0].al_apelmat)
        this.form.get('PrimerNom').setValue(this.datosReg[0].al_prinom)
        this.form.get('SegundoNom').setValue(this.datosReg[0].al_segnom)
        this.form.get('TipDoc').setValue(this.datosReg[0].al_tipdocide)
        this.form.get('NumDoc').setValue(this.datosReg[0].al_nrodocide)
        this.form.get('RepreLeg').setValue(this.datosReg[0].al_repleg)
        this.form.get('CargLeg').setValue(this.datosReg[0].al_carleg)
        this.form.get('Estado').setValue(this.datosReg[0].al_estado)
        this.form.get('Telef1').setValue(this.datosReg[0].al_telf1)
        this.form.get('Telef2').setValue(this.datosReg[0].al_telf2)
        this.form.get('Email').setValue(this.datosReg[0].al_email)
        this.form.get('Host').setValue(this.datosReg[0].al_host)
        this.form.get('Pais').setValue(this.datosReg[0].al_pais)
        this.form.get('Nacion').setValue(this.datosReg[0].al_nacion)
        this.form.get('Ubigeo').setValue(this.datosReg[0].al_telf1)
        this.form.get('Telef2').setValue(this.datosReg[0].al_telf2)
        this.form.get('Email').setValue(this.datosReg[0].al_email)
        this.form.get('TipDetracc').setValue(this.datosReg[0].al_tipdetr)
        this.form.get('TipPercep').setValue(this.datosReg[0].al_tipperc)
        this.form.get('CodMon').setValue(this.datosReg[0].al_codmon)
        this.form.get('EstContri').setValue(this.datosReg[0].al_estcon)
        this.form.get('CondContri').setValue(this.datosReg[0].al_cndcon)
        this.form.get('NumDetrac').setValue(this.datosReg[0].al_numdetr)
         }else{

          }

      });
      //Reg exp

      //Validaciones
      this.form=this.formBuilder.group({
      tipoAnex:['',Validators.required],
      CodAnex:['',Validators.required],
      TipoPer:['',Validators.required],
      RazSoc:['',],RazSoc2:[''],Direcc:[''],
      ApePat:[''], ApeMat:[''], PrimerNom:[''],SegundoNom:[''],
      TipDoc:[''],NumDoc:[''],
      Domiciliado:[''],RepreLeg:[''],CargLeg:[''],
      Estado:['',Validators.required],
      Telef1:[''],Telef2:[''],Email:[''],Host:[''],
      Pais:[''],Nacion:[''],Ubigeo:[''],
      TipDetracc:[''],TipPercep:[''],CodMon:[''],
      EstContri:[''],CondContri:[''],NumDetrac:[''],

    })
      //COmboBox tipo docuemnto
      this.servicioTbGen.listarTablas('0001','R8','').subscribe(data=> {
        this.datosCombo2=data;

        this.options= this.datosCombo2;
        this.tipoAnex= this.datosCombo2[0].tl_descri;


        });

      //Hidden
        if(this.TipoPersona=="N"){
          this.Persona=true
          this.form.get('ApePat').setValidators(Validators.required)
          this.form.get('ApeMat').setValidators(Validators.required)
          this.form.get('PrimerNom').setValidators(Validators.required)
          this.form.get('RazSoc').clearValidators();
        }else{
          if(this.TipoPersona =="J" || this.TipoPersona=="D" ){
            this.form.get('RazSoc').setValidators(Validators.required)
            this.form.get('ApePat').clearValidators();
            this.form.get('ApeMat').clearValidators();
            this.form.get('PrimerNom').clearValidators();


            this.Persona=false
          }
        }
    //filtro
    this.filteredOptions = this.myControl.valueChanges.pipe(

      startWith(''),
      map(val =>this._filter(val)),);

    //Desabilitar
    if(this.view[0]!= undefined){
      console.log(this.view[0].al_razsoc)
        this.Boton=true
        this.form.get('tipoAnex').disable();
        this.form.get('CodAnex').disable();
        this.form.get('TipoPer').disable();
        this.form.get('RazSoc').disable();
        this.form.get('RazSoc2').disable();
        this.form.get('Direcc').disable();
        this.form.get('ApePat').disable();
        this.form.get('ApeMat').disable();
        this.form.get('PrimerNom').disable();
        this.form.get('SegundoNom').disable();
        this.form.get('TipDoc').disable();
        this.form.get('NumDoc').disable();
        this.form.get('RepreLeg').disable();
        this.form.get('CargLeg').disable();
        this.form.get('Estado').disable();
        this.form.get('Telef1').disable();
        this.form.get('Telef2').disable();
        this.form.get('Email').disable();
        this.form.get('Host').disable();
        this.form.get('Pais').disable();
        this.form.get('Nacion').disable();
        this.form.get('Ubigeo').disable();
        this.form.get('Telef2').disable();
        this.form.get('Email').disable();
        this.form.get('TipDetracc').disable();
        this.form.get('TipPercep').disable();
        this.form.get('CodMon').disable();
        this.form.get('EstContri').disable();
        this.form.get('CondContri').disable();
        this.form.get('NumDetrac').disable();






    }else{ console.log("Algo anda mal");  this.Boton=false }

  }
  operar() {

    this.anexo= {
      pkID:{
        al_tipanex: `${this.form.value.tipoAnex}`,
        al_codanex: `${this.form.value.CodAnex}`
      },
    al_razsoc: `${this.form.value.RazSoc}`,
    al_razsoc2: `${this.form.value.RazSoc2}`,
    al_direcc: `${this.form.value.Direcc}`,
    al_apelpat: `${this.form.value.ApePat}`,
    al_apelmat: `${this.form.value.ApeMat}`,
    al_prinom: `${this.form.value.PrimerNom}`,
    al_segnom: `${this.form.value.SegundoNom}`,
    al_tipper: `${this.form.value.TipoPer}`,
    al_tipdocide: `${this.form.value.TipDoc}`,
    al_nrodocide:`${this.form.value.NumDoc}`,
    al_domic: "",
    al_repleg: `${this.form.value.RepreLeg}`,
    al_carleg: `${this.form.value.CargLeg}`,
    al_estado: `${this.form.value.Estado}`,
    al_telf1: `${this.form.value.Telef1}`,
    al_telf2: `${this.form.value.Telef2}`,
    al_email:`${this.form.value.Email}`,
    al_host:`${this.form.value.Host}`,
    al_pais: `${this.form.value.Pais}`,
    al_nacion: `${this.form.value.Nacion}`,
    al_tipdetr:`${this.form.value.TipDetracc}`,
    al_tipperc: `${this.form.value.TipPercep}`,
    al_ubigeo: `${this.form.value.Ubigeo}`,
    al_codmon: `${this.form.value.CodMon}`,
    al_estcon: `${this.form.value.EstContri}`,
    al_cndcon: `${this.form.value.CondContri}`,
    al_numdetr: `${this.form.value.NumDetrac}`,
    al_usrcrea: "usercrea",
    al_feccrea: "2021-12-17",
    al_hracrea: "18:02:43",
    al_usract: "userract",
    al_fecact: "2021-12-20",
    al_hraact: "09:10:05"
    };

    console.log(this.anexo);
    this.submitted = true;

    if (this.form.invalid) {
      console.log("Form invalido");
      this.servicio.setMensajeCambio("Parametros invalidos");
      return;
    }
    else{
      if(this.datosReg[0] != undefined ){
        this.servicio.ActualizaAnexo(this.anexo,'0001').subscribe((dta2) => {
          this.servicio.listaAnexos('0001','','').subscribe(data =>{
            this.servicio.settabNumCambio(data);
          this.servicio.setMensajeCambio(dta2['mensaje']+"");
          console.log(dta2);
          });
        });
        this.cerrar();

      }else{
        this.servicio.registrarAnexo(this.anexo,'0001').subscribe((dta2) => {
          this.servicio.listaAnexos('0001','','').subscribe(data =>{
            this.servicio.settabNumCambio(data);
          this.servicio.setMensajeCambio(dta2['mensaje']+"");
          console.log(dta2);
          });
        });
        this.cerrar();
      }
    }

  }

  displayFn(user: TbGenModel): string {
    return user && user.tl_descri ? user.tl_descri : '';
  }

  onChange(){
    //Tipo de Persona
    if(this.form.get('TipoPer').value=="N"){
      this.Persona=true
      this.form.get('ApePat').setValidators(Validators.required)
      this.form.get('ApeMat').setValidators(Validators.required)
      this.form.get('PrimerNom').setValidators(Validators.required)
      this.form.get('RazSoc').clearValidators();
    }else{
      if(this.form.get('TipoPer').value =="J" || this.form.get('TipoPer').value=="D" ){
        this.form.get('RazSoc').setValidators(Validators.required)
        this.form.get('ApePat').clearValidators();
        this.form.get('ApeMat').clearValidators();
        this.form.get('PrimerNom').clearValidators();
        this.Persona=false
      }
    }
  }
  private _filter(tl_descri: string): TbGenModel[] {
    const filterValue = tl_descri.toLowerCase();

    return this.options.filter(option => option.tl_descri.toLowerCase().includes(filterValue));
  }

  ayuda(anexo?: Anexo) {
    this.servicio.listaAnexos('0001','x','x').subscribe(rest => {

      this.dialog.open(UbigeoAyudaComponent, {
        width: '400px',
        height: '400px',
        data: {
          principal:rest,
        }

      });
    });

  }

  cerrar(){
    this.dialogRef.close();
  }

}
