/*
* Objeto usado para enviar filtros al back
* coincide con PrestamoSearchDto del back
* todos los campos son opcionales excepto la paginacion
*/

export class PrestamoSearch {

    gameId: number | null = null;
    clientId: number | null = null;
    date: string | null = null;
    page: number = 0;
    size: number = 5;
    sort: string = 'id,asc';
}
