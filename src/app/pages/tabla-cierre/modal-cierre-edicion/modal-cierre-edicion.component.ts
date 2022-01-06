import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { TablaCierre } from 'src/app/model/tabla-cierre';
import { TablaDetalle } from 'src/app/model/tabla-detalle';
import { TablaCierreService } from 'src/app/services/tabla-cierre.service';
import { TablaDetalleServiceService } from 'src/app/services/tabla-detalle-service.service';
import { ModalTablaDetalleComponent } from '../modal-detalle-eliminar/modal-tabla-detalle.component';

@Component({
  selector: 'app-modal-cierre-edicion',
  templateUrl: './modal-cierre-edicion.component.html',
  styleUrls: ['./modal-cierre-edicion.component.css']
})
export class ModalCierreEdicionComponent implements OnInit {
  displayedColumns=['dl_secue', 'dl_tipope', 'dl_ctasal','dl_ctatra', 'acciones'];
  dataSourceDet: MatTableDataSource<TablaDetalle>

  datosNuevos: TablaCierre;
  datosNuevos2:TablaCierre;

  datosReg: TablaCierre;
  datosRegEditDeta:TablaDetalle;

  datosRegDetalle:TablaDetalle;// variable para recibir los datos y y enviarlo al html
  public  form:FormGroup;
  public formDet:FormGroup;

  irEditar:boolean=false;
  irRegistro:boolean=false;

clear:string

/**
 *Estas variables
 */
  max:number;
  asien:string
  tam: number;
  secue:string;
  toper:string;
  csald:string;
  ctrans:string;
  x:number;
  y:string;
  secuNumber: number;


 element:TablaDetalle;
 //detalle:TablaDetalle;
  descripcion: boolean;
  constructor(

    private dialogRef:MatDialogRef<ModalCierreEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TablaCierre, //ijectamos la data al modal
    @Inject(MAT_DIALOG_DATA) private data2: TablaDetalle,
    private servicio:TablaCierreService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
   private tablaDetalleServiceSe: TablaDetalleServiceService
    ) { }

  ngOnInit(): void {
    this.datosNuevos={...this.data['principal']};
    //console.log(this.datosNuevos.cl_asien)
    this.datosNuevos2={...this.data['secundario']};



    this.tablaDetalleServiceSe.gettabCieCambio().subscribe(data=>{
      this.crearTablaDeta(data);
    });

    this.tablaDetalleServiceSe.gettabCieCambio().subscribe((data)=>{
      this.crearTablaDeta(data);
    })



    /**
     * Este funcion lista los datos del detalle comparando el id de la cabecera y el id del detalle
     */
    this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosNuevos2.cl_asien).subscribe(data=>{
      this.crearTablaDeta(data);
      //this.arregloDetalle=data;
    //console.log(data)
    })



    this.form=this.formBuilder.group({
      desc_cierre:[this.datosNuevos2.cl_descr],
      detaSecue:[this.secue == null ? '' : this.secue],
      detaTope:[this.toper == null ? '' : this.toper],
      detaCsald:[this.csald == null ? '': this.csald],
      detaCTra:[this.ctrans == null ? '':this.ctrans]
    })
    //console.log(this.form.value);
    this.formDet=this.formBuilder.group({ //valores del formulario


    })

    this.descripcion = this.form.value.desc_cierre== '' ?  true : false;

  }


  irRegistrar(){
    this.irRegistro = true
    this.irEditar=false;
    this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosNuevos2.cl_asien).subscribe((data=>{
      console.log("baby "+data.length)
      this.tam = data.length;
      this.max = data[0][0];
      for(let j=0;j<this.tam;j++)
      {
        if(data[j][0]>this.max)
        {
          this.max = data[j][0]
          this.x=this.max
        }
        //console.log(data[j][0])
      }
      var z:number = +this.max;
      this.x = z+1;
      console.log("SIGUIENTE : "+this.x)
      this.secue = `${this.x}`;
      this.form=this.formBuilder.group({
        //desc_cierre:[this.datosNuevos2.cl_descr],
        detaSecue:[this.secue],
        detaTope:[this.toper],
        detaCsald:[this.csald],
        detaCTra:[this.ctrans]
      })



        }));



  }

/**
 * Esta funcion es para actualizar y eliminar
 */
  operar()
  {
    //console.log("operar")
    this.datosReg=
    {
      cl_asien: this.datosNuevos[0].cl_asien,
      cl_descr: this.form.value.desc_cierre,
      cl_cmpr: "50",
      cl_usrcrea: "lenin",
      cl_feccrea: "2021-11-25",
      cl_hracrea: "09:45:00",
      cl_usract: "leo",
      cl_fecact: "2021-11-25",
      cl_hraact: "09:45:00"
    }
    this.datosRegEditDeta={
            pk:{
          dl_asien:this.irRegistro ? this.datosNuevos[0].cl_asien: this.asien,
          dl_secue:this.irRegistro ? this.form.value.detaSecue: this.secue,

        },
        dl_tipope:this.form.value.detaTope,
        dl_ctasal: this.form.value.detaCsald,
        dl_ctatra:  this.form.value.detaCTra,
        dl_usrcrea: "lenin",
        dl_feccrea: "2021-11-25",
        dl_hracrea: "09:45:00",
        dl_usract: "leo",
        dl_fecact: "2021-11-25",
        dl_hraact: "09:45:00",
      }

      console.log("secue"+this.secue)
      console.log("toper "+this.toper)
      console.log("csald "+this.csald)
      console.log("ctrans "+this.ctrans)
      console.log(this.datosRegEditDeta);
      console.log(this.irRegistro);
      console.log(this.irEditar);

      if(this.irRegistro){
        //registrar

        if(this.form.valid){
            this.tablaDetalleServiceSe.registrarDetalle('0001',this.datosRegEditDeta).pipe(switchMap((data) => {
              return this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosReg.cl_asien);
            }))
              .subscribe(data=> {
               this.tablaDetalleServiceSe.settabCieCambio(data);
                this.servicio.setMensajeCambio("Registrado Correctamente");
                //console.log(this.datosReg);
                //console.log(data);
              });

          }
          // if(this.formDet.valid){
          //   this.tablaDetalleServiceSe.updateDetalle('0001',this.datosRegEditDeta).pipe(switchMap((data) => {
          //     return this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosReg.cl_asien);
          //   }))
          //     .subscribe(data=> {
          //      //this.tablaDetalleServiceSe.settabCieCambio(data);
          //       this.servicio.setMensajeCambio("Actualizado correctamente");
          //       //console.log(this.datosReg);
          //       //console.log(data);
          //     });

       // }
        else{
            console.log("Formulario invalido");

          }

      }else{

        if(this.form.valid){
          this.servicio.ActualizaCiec(this.datosReg).pipe(switchMap((data) => {
            console.log(data['mensaje']);
            return this.servicio.listaCiec('0001',this.datosReg.cl_asien);

            }))
            .subscribe(data => {
              this.servicio.settabCieCambio(data);
              //this.servicio.setMensajeCambio(data['mensaje']);

            });

            this.tablaDetalleServiceSe.updateDetalle('0001',this.datosRegEditDeta).pipe(switchMap((data) => {
              return this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosReg.cl_asien);
            }))
              .subscribe(data=> {
               this.tablaDetalleServiceSe.settabCieCambio(data);
                //this.servicio.setMensajeCambio("Actualizado correctamente");
                //console.log(this.datosReg);
                //console.log(data);
              });

          }
          // if(this.formDet.valid){
          //   this.tablaDetalleServiceSe.updateDetalle('0001',this.datosRegEditDeta).pipe(switchMap((data) => {
          //     return this.tablaDetalleServiceSe.listarDetXCab('0001',this.datosReg.cl_asien);
          //   }))
          //     .subscribe(data=> {
          //      //this.tablaDetalleServiceSe.settabCieCambio(data);
          //       this.servicio.setMensajeCambio("Actualizado correctamente");
          //       //console.log(this.datosReg);
          //       //console.log(data);
          //     });

       // }
        else{
            console.log("Formulario invalido");

          }

      }


  }


    obtenerTabDetalle(cia:string, dl_asien:string,dl_secue:string ){
      this.irEditar=true;
      this.irRegistro=false;
      this.tablaDetalleServiceSe.listarDetalle(cia, dl_asien,dl_secue).subscribe(data=>{
        this.datosRegDetalle=data
        this.asien=this.datosRegDetalle[0].pk.dl_asien;
        this.secue=this.datosRegDetalle[0].pk.dl_secue;

        this.toper=this.datosRegDetalle[0].dl_tipope;
        this.csald=this.datosRegDetalle[0].dl_ctasal;
        this.ctrans=this.datosRegDetalle[0].dl_ctatra;

        this.form=this.formBuilder.group({
          desc_cierre:[this.datosNuevos2.cl_descr],
          detaSecue:[this.secue],
          detaTope:[this.toper],
          detaCsald:[this.csald],
          detaCTra:[this.ctrans]
        })
        // console.log(this.secue)
        // console.log(this.toper)
        // console.log(this.csald)
        // console.log(this.ctrans)
        // console.log( this.datosRegDetalle)

      })

    }

  cerrar() {
    this.dialogRef.close();
  }

  abrirModalCuenta($event){
    console.log($event);
  }



  /**
   *Crea la tabla en el modal edicion
  * @param dataDeta
  */
  crearTablaDeta(dataDeta: TablaDetalle[]) {

    this.dataSourceDet = new MatTableDataSource(dataDeta);
    //this.dataSourceDet.paginator = this.paginator;
    //this.dataSourceDet.sort = this.sort;
    //this.dataSourceDet.hidePageSize = true;

  }

  /**
   *esta funcion es para abrir el  modal-detalle-eliminar
   * @param tablaDetalle
   */
  eliminar(tablaDetalle:TablaDetalle){
    this.dialog.open(ModalTablaDetalleComponent,{
      width: '400px',
      data: {
        principal:tablaDetalle,
        secundario:this.datosNuevos2
      }

    })
    //console.log(tablaDetalle)
  }

}
