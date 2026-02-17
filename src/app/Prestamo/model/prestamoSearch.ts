/*
* Objeto usado para enviar filtros al back
* coincide con PrestamoSearchDto del back
* todos los campos son opcionales excepto la paginacion
*/

export class PrestamoSearch {

    //identificador del juego por el que filtrar
    //si es null, ese filtro no se aplica
    gameId: number | null = null;

    //identificador del cliente por el que filtrar
    //si es null, ese filtro no se aplica
    clientId: number | null = null;

    //filtro por fecha concreta, se envia como string para mantener el formato
    date: string | null = null;

    //paginacion obligatoria, numero de pagina a solicitar 
    page: number = 0;

    //tamaño de la pagina, por defecto 5
    size: number = 5;

    //criterio de ordenacion, por defecto id ascendente
    sort: string = 'id,asc';
}
