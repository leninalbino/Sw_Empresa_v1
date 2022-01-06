import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anexo } from 'src/app/model/Anexo';
import { AnexoService } from 'src/app/services/anexo.service';
import { TbGen } from 'src/app/services/tb-gen.service';

@Component({
  selector: 'app-ubigeo-ayuda',
  templateUrl: './ubigeo-ayuda.component.html',
  styleUrls: ['./ubigeo-ayuda.component.css']
})
export class UbigeoAyudaComponent implements OnInit {
  form: any;
 

  constructor(private dialogRef: MatDialogRef<UbigeoAyudaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Anexo,
    private servicio: AnexoService,
    private servicioTbGen:TbGen,
    private formBuilder:FormBuilder,) { }

  ngOnInit(): void {

     //Validaciones
     this.form=this.formBuilder.group({

      
     })
   
  }



  cerrar(){
    this.dialogRef.close();
  }

  operar(){
    
  }

}
