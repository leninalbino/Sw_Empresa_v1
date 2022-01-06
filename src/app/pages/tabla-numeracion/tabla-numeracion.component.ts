import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';

//importante
import { TablaNumeracion } from 'src/app/model/tabla-numeracion';
import { TablaNumeracionService } from 'src/app/services/tabla-numeracion.service';
import { ModalNumeAprobarComponent } from './modal-nume-aprobar/modal-nume-aprobar.component';
import { ModalTabNumComponent } from './modal-tab-num/modal-tab-num.component';
import { ModalTbNuevoComponent } from './modal-tb-nuevo/modal-tb-nuevo.component';
import { datosCargar } from 'src/environments/environment';
import { ModalTbViewComponent } from './modal-tb-view/modal-tb-view.component';


@Component({
  selector: 'app-tabla-numeracion',
  templateUrl: './tabla-numeracion.component.html',
  styleUrls: ['./tabla-numeracion.component.css']
})
export class TablaNumeracionComponent implements OnInit {

  displayedColumns = [ 'subdiario', 'apellidos', 'cmp', 'acciones'];
  // displayedColumns = ['id', 'anio', 'mes', 'subdiario', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<TablaNumeracion>;
  date: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tablaNumeracionService: TablaNumeracionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    datosCargar.mesCambios=this.date.getMonth()+1;
    this.tablaNumeracionService.gettabNumCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.tablaNumeracionService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.tablaNumeracionService.listarPor(this.date.getFullYear()+"",this.date.getMonth()+1+"").subscribe(data => {
      console.log(this.date.getUTCMonth())
      this.crearTabla(data);
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }
  onChange(centroId) {
    // console.log(centroId); // Aquí iría tu lógica al momento de seleccionar algo
    this.tablaNumeracionService.listarPor(this.date.getFullYear()+"",centroId).subscribe(data => {
      // console.log(this.date.getUTCMonth())
      this.crearTabla(data);
      datosCargar.mesCambios=centroId;
    });
}
  crearTabla(data: TablaNumeracion[]) {
    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  abrirDialogo(tablaNumeracion?: TablaNumeracion) {
    let urlTest = this.tablaNumeracionService.listarPorId(tablaNumeracion[0], tablaNumeracion[3], tablaNumeracion[4])
    urlTest.subscribe((data2: TablaNumeracion) => {
      this.dialog.open(ModalTabNumComponent, {
        width: '500',
        data: {
           principal:data2,
           secundario: tablaNumeracion,
          }
      });
    });
  }
  abrirDialogoView(tablaNumeracion?: TablaNumeracion) {
    let urlTest = this.tablaNumeracionService.listarPorId(tablaNumeracion[0], tablaNumeracion[3], tablaNumeracion[4])
    urlTest.subscribe((data2: TablaNumeracion) => {
      // console.log(data2);
      this.dialog.open(ModalTbViewComponent, {
        width: '500',
        data: {
           principal:data2,
           secundario: tablaNumeracion,
          }
      });
    });
  }
  abrirDialogoNuevo(tablaNumeracion?: TablaNumeracion) {
    this.tablaNumeracionService.listar().subscribe(rest => {
      // console.log(rest)
      this.dialog.open(ModalTbNuevoComponent, {
        width: '520px',
        data: rest
      });
    });
    
  }

  eliminar(tablaNumeracion: TablaNumeracion) {
    this.dialog.open(ModalNumeAprobarComponent, {
      width: '400px',
      data: tablaNumeracion
    });
    // this.tablaNumeracionService.eliminarRegTablaNume(tablaNumeracion[0],tablaNumeracion[3],tablaNumeracion[4]).pipe(switchMap(() => {
    //   return this.tablaNumeracionService.listar();
    // }))
    //   .subscribe(data => {
    //     this.tablaNumeracionService.setMensajeCambio("SE ELIMINO");
    //     this.tablaNumeracionService.settabNumCambio(data);
    //   });
  }



}
