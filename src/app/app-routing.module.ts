
//Este archivo define el sistema de rutas principal de la app, cada ruta se asocia con una URL


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { PrestamoListComponent } from './Prestamo/prestamo-list/prestamo-list.component';


//definimos las rutas de la app, cada path es una ruta
const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'categories', component: CategoryListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'prestamo', component: PrestamoListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //forRoot--> crea modulo de routinf principal
  exports: [RouterModule] //exporta el modulo de routing para que pueda ser usado en otros modulos
})
export class AppRoutingModule { }
