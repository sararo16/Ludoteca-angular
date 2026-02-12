/*
 * Este archivo representa el objeto Page<T> que devuelve Spring Boot.
 * Este modelo permite usar paginación tipada en Angular 
 */

import { Pageable } from './Pageable';
import { SortPage } from './SortPage';

export interface Page<T> {

    // Lista de elementos (Prestamo[], Game[], etc)
    content: T[];

    // Total de elementos en la consulta (sin paginar)
    totalElements: number;

    // Total de páginas
    totalPages: number;

    // Número de la página actual (0 = primera)
    number: number;

    // Tamaño de página devuelto por el backend
    size: number;

    // Información de paginación 
    pageable: Pageable;

    // Criterios de ordenación aplicados
    sort: SortPage[];
}