
/*
* Modelo que representa un prestamo en el front
coincide con el PrestamoDto del back
*/

export class Prestamo {
    id?: number | null; //null si es nuevo

    //id y name del juego asociado 
    gameId!: number;
    gameName?: string;

    //id y nombre del cliente asociado
    clientId!: number;
    clientName?: string;


    //ambas son string para evitar problemas con el Date y zonas horarias
    startDate!: string;
    endDate!: string;
}