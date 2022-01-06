import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TablaMtoCta } from 'src/app/model/tabla-mto-cta';
import { TablaMtoCtaService } from 'src/app/services/tabla-mto-cta';

@Component({
  selector: 'app-modal-cuenta',
  templateUrl: './modal-cuenta.component.html',
  styleUrls: ['./modal-cuenta.component.css']
})
export class ModalCuentaComponent implements OnInit {

  displayedColumns: string[] = ['cuenta', 'descripcion','seleccionar'];
  dataSource: MatTableDataSource<TablaMtoCta>;
  datosNuevos: TablaMtoCta[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: TablaMtoCta[],
              private service: TablaMtoCtaService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.datosNuevos = { ...this.data}

    this.service.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.service.gettabNumCambio().subscribe(data => {
      this.crearTabla(data);
    });
  }

  crearTabla(data: TablaMtoCta[]) {
    this.dataSource = new MatTableDataSource(data);
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

}
