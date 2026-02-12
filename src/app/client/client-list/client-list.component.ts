
//Este archivo muestra la lista de clientes y permite crear,editar y borrar 
//usando dialogos modales de Angular Material.


import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; //permite gestionar los datos de una tabla
import { MatDialog } from '@angular/material/dialog'; //permite abrir ventanas modales
import { ClientService } from '../client.service'; //servicio que conecta con el back para obtener/crear/Editar/borrar
import { Client } from '../model/client'; //modelo para tipar correctamente los datos
import { ClientEditComponent } from '../client-edit/client-edit.component'; //componente del formulario edicion/Creacion
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component'; //dialogo de confirmacion generico para eliminar


@Component({
  selector: 'app-client-list', //nombre del componente en HTML
  templateUrl: './client-list.component.html', //Vista asociada
  styleUrls: ['./client-list.component.scss'] //estilos
})

export class ClientListComponent {

  //fuente de datos para la tabla
  //Se incia vacia para luego rellenarla en ngOnInit
  dataSource = new MatTableDataSource<Client>();

  //columnas que se mostraran en el HTML de la tabla
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientService: ClientService, //inyeccion del servicio
    private dialog: MatDialog //servicio para abrir dialogos
  ) { }

  /*
  *Se ejecuta automaticamente al iniciar el componente
  * llama al servicio para obtener la lista de clientes desde el back
  */
  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.dataSource.data = clients; //actualiza datos de la tabla
    });
  }

  /*
  *Abre el formulario en un modal para crear un nuevo cliente
  * Se pasa un cliente vacio como dato inicial
  */
  createClient() {
    this.dialog.open(ClientEditComponent, {
      width: '400px',
      data: {
        client: { name: '' }, //cliente vacio
        clientes: this.dataSource.data //lista actual para validar duplicados
      }
    });
  }


  /*
  * Abre el formulario de edicion para un cliente existente
  */
  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      width: '400px',
      data: {
        client: client, //cliente a editar
        clientes: this.dataSource.data //lista actual (util en el modal)
      }
    });
  }

  /*
  * Abre un modal de confirmacion para eliminar un cliente
  * Si el usuario confirma, llama al servicio para borra por Id.
  */
  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: "Eliminar cliente",
        description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //El usuario confirmó la eliminación

        // Validacion de seguridad: comprobar que el cliente tiene id
        if (client.id == null) {
          console.error("El cliente no tiene un ID válido.");
          return;
        }
        //llamada al back para borrar
        this.clientService.deleteClient(client.id)
          .subscribe(() => this.ngOnInit());
      }
    });
  }

}
