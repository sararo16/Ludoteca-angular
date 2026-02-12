import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamoListComponent } from './prestamo-list/prestamo-list.component';
import { PrestamoItemComponent } from './prestamo-list/prestamo-item/prestamo-item.component';
import { PrestamoEditComponent } from './prestamo-edit/prestamo-edit.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    PrestamoListComponent,
    PrestamoItemComponent,
    PrestamoEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PrestamoModule { }
