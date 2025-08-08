import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.model';

const API = 'http://localhost:3000/players';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http:HttpClient){}

  list(): Observable<Player[]> {
    return this.http.get<Player[]>(API);
  }

  get(id: number): Observable<Player> {
    return this.http.get<Player>(`${API}/${id}`);
  }

  create(player: Player): Observable<Player> {
    return this.http.post<Player>(API, player)
  }

  update(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${API}/${id}`, player);
  }

  delete(id: number): Observable<Player> {
    return this.http.delete<Player>(`${API}/${id}`);
  }
}
