import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MedicoComponent } from './pages/medico/medico.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TablaNumeracionComponent } from './pages/tabla-numeracion/tabla-numeracion.component';
import { ModalTabNumComponent } from './pages/tabla-numeracion/modal-tab-num/modal-tab-num.component';
import { ModalTbNuevoComponent } from './pages/tabla-numeracion/modal-tb-nuevo/modal-tb-nuevo.component';
import { ModalNumeAprobarComponent } from './pages/tabla-numeracion/modal-nume-aprobar/modal-nume-aprobar.component';
import { ModalTbViewComponent } from './pages/tabla-numeracion/modal-tb-view/modal-tb-view.component';
import { AnexosComponent } from './pages/anexos/anexos.component';
import { ModalAnexoAprobarComponent } from './pages/anexos/modal-anexo-aprobar/modal-anexo-aprobar.component';
import { ModalAnexoEdicionComponent } from './pages/anexos/modal-anexo-edicion/modal-anexo-edicion.component';
import { UbigeoAyudaComponent } from './pages/anexos/ubigeo-ayuda/ubigeo-ayuda.component';
import { ModalTablaCierreAprobarComponent } from './pages/tabla-cierre/modal-cierre-aprobar/modal-tabla-cierre-aprobar.component';
import { TablaCierreComponent } from './pages/tabla-cierre/tabla-cierre.component';
import { ModalCierreEdicionComponent } from './pages/tabla-cierre/modal-cierre-edicion/modal-cierre-edicion.component';
import { ModalTablaDetalleComponent } from './pages/tabla-cierre/modal-detalle-eliminar/modal-tabla-detalle.component';
import { ModalDetalleVistaComponent } from './pages/tabla-cierre/modal-detalle-vista/modal-detalle-vista.component';




@NgModule({
  declarations: [
    AppComponent,

    MedicoComponent,

    MedicoDialogoComponent,
         TablaNumeracionComponent,
         ModalTabNumComponent,
         ModalTbNuevoComponent,
         ModalNumeAprobarComponent,
         ModalTbViewComponent,
         AnexosComponent,
         ModalAnexoAprobarComponent,
         ModalAnexoEdicionComponent,
         UbigeoAyudaComponent,
         ModalTablaCierreAprobarComponent,
         TablaCierreComponent,
         ModalCierreEdicionComponent,
         ModalTablaDetalleComponent,
         ModalDetalleVistaComponent,
        




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
