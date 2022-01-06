import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnexosComponent } from './pages/anexos/anexos.component';

import { MedicoComponent } from './pages/medico/medico.component';
import { TablaCierreComponent } from './pages/tabla-cierre/tabla-cierre.component';
import { TablaNumeracionComponent } from './pages/tabla-numeracion/tabla-numeracion.component';


const routes: Routes = [
  
  { path: 'tablaNumeracion', component: TablaNumeracionComponent },
  { path: 'tablaGeneral', component: MedicoComponent },
  { path: 'tablaAnexos', component: AnexosComponent },
  {path: 'tablaCierre',component:TablaCierreComponent,}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
