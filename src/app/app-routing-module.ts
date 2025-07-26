import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'formulario', pathMatch: 'full'},
  {path: 'formulario', loadChildren: () => import('./features/formulario/formulario.module').then(m => m.FormularioModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
