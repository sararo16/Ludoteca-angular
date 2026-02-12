import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './model/Game';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly baseUrl = 'http://localhost:8080/game';

  constructor(private http: HttpClient) { }

  /** LISTAR con filtros opcionales */
  getGames(title?: string, categoryId?: number): Observable<Game[]> {
    let params = new HttpParams();

    if (title && title.trim().length > 0) {
      params = params.set('title', title.trim());
    }
    if (typeof categoryId === 'number') {
      params = params.set('idCategory', String(categoryId));
    }

    return this.http.get<Game[]>(this.baseUrl, { params });
  }

  /** CREAR (POST /game) */
  createGame(game: Game): Observable<Game> {
    return this.http.put<Game>('http://localhost:8080/game', game);
  }

  /** ACTUALIZAR (PUT /game/{id}) */

  updateGame(game: Game) {
    if (game.id == null) throw new Error('updateGame: id requerido');
    return this.http.put<Game>(`http://localhost:8080/game/${game.id}`, game);
  }


  /** ELIMINAR (DELETE /game/{id}) */
  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}