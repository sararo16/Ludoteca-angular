
/*
* Modelo que representa un prestamo en el front
* coincide con el PrestamoDto del back
*/

export class Prestamo {

    //identificador del prestamo, es opcional y puede venir a null cuando es alta
    id?: number | null;

    //Identificador del juego asociado:- gameid: necesario para operar y name para mostrar en la tabla
    gameId!: number;
    gameName?: string;

    //id y nombre del cliente asociado
    clientId!: number;
    clientName?: string;

    //fechas representadas como string para evitar problemas con date/zonas horarias en el front
    //se espera formato consistente en el back
    startDate!: string;
    endDate!: string;
}