import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VistaComponent } from './components/vista/vista.component';
import { CrearActualizarComponent } from './components/crear-actualizar/crear-actualizar.component';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginatorModule } from 'primeng/paginator';
import { VistaGeneralComponent } from './components/vista-general/vista-general.component';

@NgModule({
  declarations: [
    NavbarComponent,
    VistaGeneralComponent,
    VistaComponent,
    CrearActualizarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    PaginatorModule
  ]
})
export class UsuariosModule { }
