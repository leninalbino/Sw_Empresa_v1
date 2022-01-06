import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TbCaja } from 'src/app/model/tabla-caja';
import { TablaCajaService } from 'src/app/services/tabla-caja.service';
import { GenericService } from 'src/app/_service/generic.service';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';
import { ModalEditarComponent } from './modal-editar/modal-editar.component';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { ModalVistaComponent } from './modal-vista/modal-vista.component';





@Component({
  selector: 'app-tabla-caja',
  templateUrl: './tabla-caja.component.html',
  styleUrls: ['./tabla-caja.component.css']
})
export class TablaCajaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['bl_codbco', 'descripcion', 'Moneda', 'Cuenta', 'Acciones'];
  dataSource: MatTableDataSource<TbCaja>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: TablaCajaService,
    private dialog: MatDialog, private snackBar: MatSnackBar
    ) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
      this.service.listar().subscribe((data)=>{
        this.crearTabla(data);
        console.log(data);
      });

      this.service.getMensajeCambio().subscribe(data => {
        this.snackBar.open(data, 'AVISO', { duration: 2000 });
      });

      this.service.gettabNumCambio().subscribe(data => {
        this.crearTabla(data);
      });

  }


  

   eliminar(tablaCaja: TbCaja){
     this.dialog.open(ModalEliminarComponent, {
       width: '400px',
       data: tablaCaja
     });
   }
   crearTabla(data: TbCaja[]) {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.hidePageSize = true;
  }






   abrirVista(tbCaja: TbCaja){
    this.service.listarPorCodigo(tbCaja[0]).subscribe((data2: TbCaja)=>{
      this.dialog.open(ModalVistaComponent, {
        width: '600px',
        data:{
          principal:data2,
          secundario: tbCaja
        }
      });
    });
   }




  abrirDialogo(tbCaja: TbCaja){
    this.service.listarPorCodigo(tbCaja[0]).subscribe((data2: TbCaja)=>{
      this.dialog.open(ModalEditarComponent, {
        width: '650px',
        data:{
          principal:data2,
          secundario: tbCaja
        }
      });
    });
  }

  abrirDialogoNuevo(tbCaja?: TbCaja){
    this.service.listarPorCodigo('').subscribe((data: TbCaja)=>{
      console.log(data);
      this.dialog.open(ModalAgregarComponent, {
        width: '550px',
        data: {
          principal:data,
          secundaria: tbCaja
        }
      })
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
 }

}

// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
//}
