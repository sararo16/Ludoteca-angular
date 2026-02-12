
/*
* Componente encargado de mostrar la tabla de prestamos
* Incluye: filtros, paginacion apertura del modal(crear/editar) y eliminacion de prestamos
* Se comunica unicamente con PrestamoService (utiliza los modelos tipados page y prestamoSearch)
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

//servicios del modulo de prestamos
import { PrestamoService } from '../prestamo.service';

//modelos propios
import { Prestamo } from '../model/Prestamo';

import { PrestamoSearch } from '../model/prestamoSearch';

//modelo generico de paginacion
import { Page } from '../../core/model/page/Page';

//filtros de combos
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/client';

//servicios para cargar clientes y juegos
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';

//modal de creacion/edicion
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';


@Component({
  selector: 'app-prestamo-list',
  templateUrl: './prestamo-list.component.html',
  styleUrls: ['./prestamo-list.component.scss']
})

export class PrestamoListComponent implements OnInit {

  /*
  * Columnas visibles en la tabla Angular Material
  */

  displayedColumns = [
    'id',
    'gameName',
    'clientName',
    'startDate',
    'endDate',
    'actions'
  ];

  //lista de prestamos obtenidos del back
  prestamos: Prestamo[] = [];

  //listas para cargar los combos de filtros
  games: Game[] = [];
  clients: Client[] = [];

  //variables de filtros seleccionados por el usuario
  filterGameId: number | null = null;
  filterClientId: number | null = null;
  filterDate: Date | null = null;

  //numero total de elementos devueltos por la busqueda(necesarios para el paginator)
  totalItems: number = 0;

  //referencia al paginador del HTML (necesario para obtener pageIndex y pageSize)
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private prestamoService: PrestamoService,
    private gameService: GameService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  /*
  * Se ejecuta al cargar el componente
  * Carga clientes (para filtros)
  * carga juegos (para filtros)
  * Lanza la primera busqueda de prestamos 
  */

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => this.clients = clients);
    this.gameService.getGames().subscribe(games => this.games = games);
    this.search(); //primera carga sin filtros
  }

  /*
  * Convierte el date del mat-datepicker a un string con formato yyyy-MM-dd 
  * Este formato es el que entiende Spring boot para localdate
  */

  private toIso(date: Date | null): string | null {

    if (!date) return null;
    return date.toISOString().substring(0, 10);
  }

  /*
  * Metodo principal de busqueda
  * construye un PrestamoSearch y llama al back
  * Tambien recoge y actualiza al paginator
  */

  search(): void {
    const body: PrestamoSearch = {
      gameId: this.filterGameId,
      clientId: this.filterClientId,
      date: this.toIso(this.filterDate),

      //pageIndex y pageSize vienen del MatPaginator
      page: this.paginator ? this.paginator.pageIndex : 0,
      size: this.paginator ? this.paginator.pageSize : 5,
      sort: 'id,asc'
    };

    /*
    * Suscripcion al servicio
    * Aqui recibimos un Page tipado
    * con content, totalElements, number, size...
    */
    this.prestamoService.searchPrestamos(body)
      .subscribe((page: Page<Prestamo>) => {
        this.prestamos = page.content;
        this.totalItems = page.totalElements;
      });
  }

  //reseta todos los filtros y vuelve a buscar
  cleanFilters(): void {
    this.filterGameId = null;
    this.filterClientId = null;
    this.filterDate = null;

    //vuelve3 a la primera pagina del paginador
    this.paginator.firstPage();

    this.search();
  }

  /*
  * Abre un modal para crear o editar un prestamo
  * si recibe un prestamo -- edicion
  * Si recibe null -- creacion
  */
  openEdit(prestamo?: Prestamo): void {
    const dialogRef = this.dialog.open(PrestamoEditComponent, {
      width: '500px',
      data: { prestamo: prestamo ?? null }
    });

    //si el usuario guarda, recargamos la tabla
    dialogRef.afterClosed().subscribe(saved => {
      if (saved) this.search();
    });
  }

  /*
  * llamada para borrar un prestamo por id.
  * si el back responde ok, actualiza la lista
  */
  deletePrestamo(id: number): void {
    this.prestamoService.deletePrestamo(id).subscribe(() => this.search());
  }

  /*
  * Cuando el usuario cambia de pagina (paginator):
  * simplemente llamamos a search de nuevo
  */
  onPageChange(): void {
    this.search();
  }
}
