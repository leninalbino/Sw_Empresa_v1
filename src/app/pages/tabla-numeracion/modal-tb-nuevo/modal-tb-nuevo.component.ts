import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith, switchMap } from 'rxjs/operators';

import { TbGenModel } from 'src/app/model/tb-gen-model';
import { TablaNumeracion } from 'src/app/model/tabla-numeracion';
import { TablaNumeracionService } from 'src/app/services/tabla-numeracion.service';
import { TbGen } from 'src/app/services/tb-gen.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export interface User {
  name: string;
}
@Component({
  selector: 'app-modal-tb-nuevo',
  templateUrl: './modal-tb-nuevo.component.html',
  styleUrls: ['./modal-tb-nuevo.component.css']
})


export class ModalTbNuevoComponent implements OnInit {
  myControl = new FormControl();
  options: TbGenModel[];
  filteredOptions: Observable<TbGenModel[]>;




  datosNuevos: TablaNumeracion;
  datosNuevos2: TablaNumeracion;
  date: Date = new Date();
  datosReg:TablaNumeracion;
  datosCombo;

  seleccionada: string ;
  public form:FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ModalTbNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TablaNumeracion,
    private servivio: TablaNumeracionService,
    private servivioTbGen:TbGen,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.datosNuevos = { ...this.data };

    this.servivioTbGen.listar().subscribe(data=> {
      this.datosCombo=data;
      console.log(this.datosCombo[0]);
      this.options= this.datosCombo;
      this.seleccionada= this.datosCombo[0].pkID.tl_clave;
    });
    this.form=this.formBuilder.group({
      tex_nl_subdia:['',Validators.required],
      subdiario:['',Validators.required]
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val =>this._filter(val)),
      // map(value => (typeof value === 'string' ? value : value.name)),
      // map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  operar() {
   
    this.datosReg={
      pkID: {
        nl_subdia:`${this.form.value.subdiario}`,
        nl_anio:`${this.date.getFullYear()}`,
        nl_mes:`${this.date.getMonth()+1}`
    },
    nl_nume:this.form.value.tex_nl_subdia*1,
    nl_usrcrea:"Test User",
    nl_feccrea:"",
    nl_hracrea:"",
    nl_usract:"",
    nl_fecact:"",
    nl_hraact:"",
      
      // pkID: {
      //     nl_subdia:this.form.value.subdiario,
      //     nl_anio: `${this.date.getFullYear()}`,
      //     nl_mes: `${this.date.getMonth()+1}`
      // },
      // nl_nume:this.form.value.tex_nl_subdia*1,
      // nl_usrcrea:"Usuario Temporal",
      // nl_feccrea:"",
      // nl_hracrea:"",
      // nl_usract:"",
      // nl_fecact:"",
      // nl_hraact:""
  }
      this.servivio.registrar(this.datosReg).subscribe((dta2) => {
        console.log(this.datosReg);
        this.servivio.listarPor(`${this.date.getFullYear()}`,`${this.date.getMonth()+1}`).subscribe(data => {
          this.servivio.settabNumCambio(data);
          this.servivio.setMensajeCambio(dta2['mensaje']+"");
          // console.log(this.datosReg);
          console.log(dta2);
        });
      });
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }

  displayFn(user: TbGenModel): string {
    return user && user.tl_descri ? user.tl_descri : '';
  }

  private _filter(tl_descri: string): TbGenModel[] {
    const filterValue = tl_descri.toLowerCase();

    return this.options.filter(option => option.tl_descri.toLowerCase().includes(filterValue));
  }

}
