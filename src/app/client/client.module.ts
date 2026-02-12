
//Este archivo agrupa los componentes y modulos necesarios para gestionar clientes 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //esencial para usar directivas basicas 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //formularios y formularios reactivos
import { MatTableModule } from '@angular/material/table'; //tablas y listas
import { MatIconModule } from '@angular/material/icon'; //botones editar y borrar
import { HttpClientModule } from '@angular/common/http'; //Necesario para peticiones HTTP 

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Componentes del cliente
import { ClientListComponent } from './client-list/client-list.component';
import { ClientItemComponent } from './client-list/client-item/client-item.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

@NgModule({
    declarations: [
        //componentes del modulo de clientes
        ClientListComponent,
        ClientItemComponent, //no se usa
        ClientEditComponent
    ],
    imports: [
        //modulos necesarios para el funcionamiento del modulo de clientes
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
    providers: [
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}, //valor por defecto si el dialogo no recibe data
        },
    ]
})
export class ClientModule { }