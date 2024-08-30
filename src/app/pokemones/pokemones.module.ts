import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarPokemonesComponent } from './components/navbar/navbar.component';
import { CrearActualizarPokemonesComponent } from './components/crear-actualizar/crear-actualizar.component';
import { VistaGeneralPokemonesComponent } from './components/vista-general/vista-general.component';
import { VistaPokemonesComponent } from './components/vista/vista.component';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginatorModule } from 'primeng/paginator';
import { PokemonesRoutingModule } from './pokemones-routing.module';
import { TimempoAtrasPipe } from '../tiempoAtras.pipe';

@NgModule({
  declarations: [
    TimempoAtrasPipe,
    NavbarPokemonesComponent,
    VistaGeneralPokemonesComponent,
    VistaPokemonesComponent,
    CrearActualizarPokemonesComponent
  ],
  imports: [
    CommonModule,
    PokemonesRoutingModule,
    ReactiveFormsModule,
    PaginatorModule
  ]
})
export class PokemonesModule { }
