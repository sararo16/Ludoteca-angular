
//modelo que representa a un cliente en el front.
//Esta interfaz define la forma que tendra el objeto Client.


export interface Client {
    id?: number; //El id es opcional porque cuando se crea un cliente aun no existe id, cuando viene del back si incluye id
    name: string;
}