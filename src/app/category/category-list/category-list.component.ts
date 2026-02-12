
//Este archivo muestra la lista de categorias y permite crear nuevas abriendo un formulario en un modal

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  dataSource = new MatTableDataSource<Category>(); //fuente de datos para la tabla
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService, //servicio para obtener categorias
    private dialog: MatDialog //servicio para abrir modales
  ) { }

  //metodo que se ejecuta al iniciar el componente, llama al servicio para obtener las categorias
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.dataSource.data = categories; //actualiza datos de la tabla
    });
  }

  //abre un Dialogo para crear una nueva categoria

  createCategory() {
    this.dialog.open(CategoryEditComponent, {
      data: { category: { name: '' } }
    });
  }


  //abre un dialogo para editar una categoria existente
  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category: category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  //abre un dialogo de confirmacion para eliminar una categoria

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: "Eliminar categoría",
        description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        // Comprobar id válido
        if (category.id == null) {
          console.error("La categoría no tiene un ID válido.");
          return;
        }

        this.categoryService.deleteCategory(category.id)
          .subscribe(() => this.ngOnInit());
      }
    });
  }

}
