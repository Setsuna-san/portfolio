import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProjetComponent } from './projet/projet.component';

export const routes: Routes = [
    { path: 'projets', component: ProjetComponent},
    { path: '', component: AccueilComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
