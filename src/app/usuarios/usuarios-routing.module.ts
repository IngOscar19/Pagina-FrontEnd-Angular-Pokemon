import { VistaComponent } from './components/vista/vista.component';
import { CrearActualizarComponent } from './components/crear-actualizar/crear-actualizar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VistaGeneralComponent } from './components/vista-general/vista-general.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children:
      [
      {path: 'vista', component: VistaGeneralComponent},
      {path: 'create', component: CrearActualizarComponent},
      {path: 'ver/:id', component: VistaComponent},
      {path: 'actualizar/:id', component: CrearActualizarComponent},
      {path: '**', redirectTo: 'vista'} 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
