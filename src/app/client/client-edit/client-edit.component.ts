import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../client.service';
import { Client } from '../model/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  //Modelo que se vincula al formulario del modal
  //si es edicion, vendra con id y name, si es nuevo, name vacio
  client: Client = { id: 0, name: '' };

  //lista de clientes existentes para validar duplicados en el front
  clientesExistentes: Client[] = [];


  constructor(
    //Referencia al dialogo actual, para poder cerrarlo cuando
    //guardamos/cancelamos
    public dialogRef: MatDialogRef<ClientEditComponent>,

    //inyeccion de datos que vienen del componente que abre el modal.
    //esperamos {client,clientes}
    @Inject(MAT_DIALOG_DATA) public data: any,

    //servicio que habla con el backend (PSOT/PUT)
    private clientService: ClientService,

    //Componente de feedback visual
    private snackbar: MatSnackBar
  ) { }


  /*
  * Carga inicial del modal:
  * clona el cliente recibido (para no mutar directamente el objeto del padre)
  * carga la lista de clientes para la validacion deduplicados
  */
  ngOnInit(): void {
    if (this.data && this.data.client) {
      //Object.assign clona propiedades en un objeto nuevo para evitar efectos colaterales
      this.client = Object.assign({}, this.data.client);
    }

    if (this.data && this.data.clientes) {
      this.clientesExistentes = this.data.clientes;
    }
  }


  /*
  *Guardar
  * Normaliza el nombre (trim + lowercase)
  * Valida duplicados en el front 
  * Si ok, llama al servicio saveClient: POST no id, PUT si id
  * cierra modal al terminar
  */

  //VALIDACION -- nombre duplicado
  onSave() {
    const nombre = this.client.name.trim().toLowerCase();

    // VALIDACIÓN: nombre duplicado
    const existe = this.clientesExistentes.some(c =>
      c.name.trim().toLowerCase() === nombre &&
      c.id !== this.client.id //si edito, me permito mantener mi propio nombre
    );

    if (existe) {
      //feedback de error amigable al usuario 
      this.snackbar.open(
        'Ya existe un cliente con ese nombre.',
        'Cerrar',
        { duration: 3000, panelClass: 'snack-error' }
      );
      return; // NO GUARDAR
    }


    // Si no hay duplicado en front, delegamos en el servicio (POST/PUT).
    this.clientService.saveClient(this.client).subscribe({
      next: () => this.dialogRef.close(), // Cerrar modal y dejar que la lista se refresque.
      error: (err) => {
        // Manejo básico de error (por ejemplo, si el back devuelve 409 por duplicado).
        const msg = err?.error?.message || 'No se pudo guardar el cliente';
        this.snackbar.open(msg, 'Cerrar', { duration: 3000, panelClass: 'snack-error' });
      }
    });
  }


  //cerrar el modal sin guardar 
  onClose() {
    this.dialogRef.close();
  }

}
