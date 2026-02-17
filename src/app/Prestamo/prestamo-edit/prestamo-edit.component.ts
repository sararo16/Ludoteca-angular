
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Servicios del módulo préstamo
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';

// Servicios para cargar datos e1n combos
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';

// Modelos de combos
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/client';

@Component({
  selector: 'app-prestamo-edit',
  templateUrl: './prestamo-edit.component.html',
  styleUrls: ['./prestamo-edit.component.scss']
})
export class PrestamoEditComponent implements OnInit {

  //el objeto el cual editaremos o crearemos (se inyecta o se inicializa en blanco)
  prestamo!: Prestamo;

  //listas cargadas desde el back para los combos del formulario
  games: Game[] = [];
  clients: Client[] = [];

  //mensaje de error cuando el back diga que no se puede guardar (solapamientos..)
  backendError?: string;

  constructor(
    //referencia al dialogo para poder cerrarlo (ok/cancel)
    public dialogRef: MatDialogRef<PrestamoEditComponent>,

    //datos que llegan al dialog: si viene un prestamo, es edicion si no es alta
    @Inject(MAT_DIALOG_DATA) public data: { prestamo: Prestamo | null },

    //servicios para gestionar prestamos y cargar datos del formulario
    private prestamoService: PrestamoService,
    private gameService: GameService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {

    /*
     * 1. iniciamos el objeto prestamo 
    * Si viene en data, clonamos para no modificar el original antes de guardar
    * Si no viene, nuevo prestamo
    */

    if (this.data?.prestamo != null) {
      this.prestamo = Object.assign({}, this.data.prestamo);
      //si stardate/endate vienen en formato fecha, mat-datepicker admite string o date
    } else {
      this.prestamo = new Prestamo();
    }

    /*
    * 2. Cargamos combos de clientes y juegos
    * Se obtienen desde el back y se asignan los arrays del formulario
    */
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      //si venimos en modo edicion, aseguraamos que clientId tenga un valor valido para el combo
    });
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  //validaciones  de fechas del front

  /*
  *Comprueba que endDate>=StartDate
  *Acepta string o date. 
  * devuelve true si ok, false si es invalido
  */
  private validateEndAfterStart(): boolean {
    if (!this.prestamo.startDate || !this.prestamo.endDate) return true; //se validara required en back

    const s = this.asDate(this.prestamo.startDate);
    const e = this.asDate(this.prestamo.endDate);

    //si no se pudieron convertir, dejamos que el back valide 
    if (!s || !e) return true;

    //normalizamos a medianoche para evitar desfases por zona horaria
    const s0 = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    const e0 = new Date(e.getFullYear(), e.getMonth(), e.getDate());

    return e0.getTime() >= s0.getTime();
  }

  /**
   * comprueba que la duracion no supere 14 dias
   * incluimos ambos extremos: si pides del 1 al 14 -- 14 dias
   */
  private validateMax14Days(): boolean {
    if (!this.prestamo.startDate || !this.prestamo.endDate) return true;

    //converitr fechas a objetos date
    const s = this.asDate(this.prestamo.startDate);
    const e = this.asDate(this.prestamo.endDate);
    if (!s || !e) return true;

    //creamos las fechas normalizadas 
    const ms = new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime()
      - new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime();
    //convertimos milisegundos a dias, sumamos 1 para incluir ambos extremos
    const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
    return days <= 14;
  }

  /*
  * convierte un string con formato "yyyy-mm-dd" o date a date
  * retorna null si ni puede convertir 
  */

  private asDate(value: string | Date): Date | null {
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const parts = value.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);
        const dt = new Date(y, m, d);
        //validacion basica
        if (!isNaN(dt.getTime())) return dt;
      }
    }
    return null;
  }

  /*
  * Convierte Date o string fecha a 'yyyy-mm-dd'
  */
  private toIso(value: any): string | null {
    if (!value) return null;

    if (value instanceof Date) {
      return value.toISOString().substring(0, 10);
    }

    if (typeof value === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value; // ya está bien
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return d.toISOString().substring(0, 10);
      }
    }

    return null;
  }

  // guardar (crear/editar)

  onSave() {
    this.backendError = undefined; //limpiamos error previo

    // Validaciones front
    if (!this.validateEndAfterStart()) {
      this.backendError = 'La fecha de fin no puede ser anterior a la fecha inicio';
      return;
    }

    if (!this.validateMax14Days()) {
      this.backendError = 'El préstamo no puede superar los 14 días';
      return;
    }
    //normalizacion del payload antes de enviar el back
    const start = this.toIso(this.prestamo.startDate);
    const end = this.toIso(this.prestamo.endDate);

    const payload: Prestamo = {
      id: this.prestamo.id ?? null,
      clientId: this.prestamo.clientId,
      gameId: this.prestamo.gameId,
      startDate: start!,
      endDate: end!
    };

    // si no tiene id, crear
    if (payload.id == null) {
      this.prestamoService.createPrestamo(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => {
          this.backendError = err.error?.message ?? err.error ?? 'No se pudo crear el préstamo';
          console.error(err);
        }
      });
    }

    // si tiene id, actualizar
    else {
      this.prestamoService.updatePrestamo(payload.id, payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => {
          this.backendError = err?.error?.message || 'No se pudo actualizar el préstamo';
        }
      });
    }
  }
  //cierra dialogo sin guardar
  onClose() {
    this.dialogRef.close();
  }
}


