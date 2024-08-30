import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarPokemonesComponent } from './components/navbar/navbar.component';
import { VistaGeneralPokemonesComponent } from './components/vista-general/vista-general.component';
import { CrearActualizarPokemonesComponent } from './components/crear-actualizar/crear-actualizar.component';
import { VistaPokemonesComponent } from './components/vista/vista.component';

const routes: Routes = [
    {
        path: '', component: NavbarPokemonesComponent, children:
            [
            {path: 'vistapokemones', component: VistaGeneralPokemonesComponent},
            {path: 'createpokemones', component: CrearActualizarPokemonesComponent},
            {path: 'verpokemon/:id', component: VistaPokemonesComponent},
            {path: 'actualizarpokemones/:id', component: CrearActualizarPokemonesComponent},
            {path: '**', redirectTo: 'vistapokemones'} 
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonesRoutingModule { }
