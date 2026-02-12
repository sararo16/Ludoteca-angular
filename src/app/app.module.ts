
//Este archivo registra todos los modulos globales para que la app Angular funcione

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //es necesario para que Angular funcione en el navegador

import { AppRoutingModule } from './app-routing.module'; //rutas principales
import { AppComponent } from './app.component'; //componente raiz  de toda la app
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //necesario para activar animaciones
import { CoreModule } from './core/core.module'; //servicios globales (dialogos, interceptores)

import { CategoryModule } from './category/category.module'; //modulo de categorias
import { AuthorModule } from './author/author.module'; //modulo de autores
import { GameModule } from './game/game.module'; //modulo de juegos
import { ClientModule } from './client/client.module'; //modulo de clientes
import { PrestamoModule } from './Prestamo/prestamo.module'; //modulo de prestamos

import { MatDialogModule } from "@angular/material/dialog"; //para poder usar dialogos modales en toda la app
import { MatFormFieldModule } from "@angular/material/form-field"; //para usar mat form field en formularios
import { FormsModule } from '@angular/forms'; //permite usar formularios template driven 

@NgModule({
  //componentes que pertenecen a este modulo
  declarations: [
    AppComponent, //solo el root componenet. El resto esta en sus modulos
  ],
  //importamos modulos necesarios para que la app funcione
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CategoryModule,
    AuthorModule,
    GameModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ClientModule,
    PrestamoModule,
  ],
  //servicios globales (en este caso no hay)
  providers: [],
  bootstrap: [AppComponent] //componente inicial que arranca la app
})
export class AppModule { }
