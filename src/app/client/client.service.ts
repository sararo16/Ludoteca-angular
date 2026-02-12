
//Este archivo se conecta con el back, ofrece metodos listos para usar, devuelve observables

import { Injectable } from '@angular/core'; //permite que este servicio pueda ser inyectado en componentes
import { HttpClient } from '@angular/common/http'; //modulo para hacer peticiones HTTP
import { Observable } from 'rxjs'; //representa una respuesta asincrona
import { Client } from './model/client'; //interfaz para tipar correctamente los datos recibidos/enviados

//esto hace que el servicio esté disponible en toda la aplicación 
// sin necesidad de importarlo en cada componente
@Injectable({
    providedIn: 'root'
})

export class ClientService {

    private baseUrl = 'http://localhost:8080/api/clients';

    constructor(
        private http: HttpClient //inyeccion de HTTPClient para realizar llamadas al back
    ) { }

    /*
    * GET -- devuelve la lista completa de clientes
    */
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl);
    }

    /*
    * POST -- crea un nuevo cliente
    */
    createClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl, client);
    }


    /*
    *Metodo combinado crear/actualizar
    * Si cliente.id es null crea uno nuevo
    * Si tiene id se actualiza
    * Esta logica simplifica el codigo en los componentes
    */
    saveClient(client: Client): Observable<Client> {
        if (client.id == null) {
            return this.http.post<Client>(this.baseUrl, client);
        } else {
            return this.http.put<Client>(`${this.baseUrl}/${client.id}`, client);
        }
    }


    /*
    * DELETE -- borra un cliente por su id
    * el back devuelve void-- aqui se usa Observable <void>
    */
    deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}