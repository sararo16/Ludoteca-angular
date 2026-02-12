
/*
* Servicio responsable de realizar llamadas HTTP al back
* Usa el endpoint /api/prestamos definido en Spring Boot
*/

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
//modelos propios del modulo
import { Prestamo } from './model/Prestamo';
import { PrestamoSearch } from './model/prestamoSearch';
//modelo generico de paginacion
import { Page } from '../core/model/page/Page';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  //URL base del endpoint REST del back
  private baseUrl = 'http://localhost:8080/api/prestamos';


  constructor(private http: HttpClient) { }

  /*
  *Busqueda paginada de prestamos
  * POST /api/prestamos/search
  * Envio un prestamoSearch con filtros opciones + paginacion
  */

  searchPrestamos(body: PrestamoSearch): Observable<Page<Prestamo>> {
    return this.http.post<Page<Prestamo>>(`${this.baseUrl}/search`, body);
  }

  /*
  * crear prestamo
  * POST /api/prestamos
  * El back ignora id y crea uno nuevo
  * campos obligatorios: gameid, clienteid, startDate, endDate
  */

  createPrestamo(body: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.baseUrl}`, body);
  }

  /*
  * Actualizar prestamo
  * PUT /api/prestamos/{id}
  * Requiere que el prestamo tenga id (lo paso por URL)
  * aplica mismas validaciones que la creacion
  */

  updatePrestamo(id: number, body: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.baseUrl}/${id}`, body);
  }

  /*
  *Eliminar prestamo
  * DELETE /api/prestamos/{id}
  * si el id no existe, el back devuelve 404
  */
  deletePrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}