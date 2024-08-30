import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./../app/login-form/login.module').then(m => m.LoginModule)
  },
  {
    path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [authGuard]
  },
  {
    path: '', loadChildren: () => import('./pokemones/pokemones.module').then(m => m.PokemonesModule),
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
