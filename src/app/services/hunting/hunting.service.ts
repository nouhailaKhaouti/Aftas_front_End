import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hunting, Weight } from 'src/app/model/hunting.model';

@Injectable({
  providedIn: 'root'
})
export class HuntingService {

  private apiUrl = 'http://localhost:8090/Aftas/api/hunting/';

  constructor(private http: HttpClient) { }

  // GET request to fetch Hunting data
  getHuntingData(): Observable<Hunting[]> {
    return this.http.get<Hunting[]>(`${this.apiUrl}`);
  }

  getMemberHuntingData(hunting: Hunting): Observable<Hunting[]> {
    return this.http.post<Hunting[]>(`${this.apiUrl}/member/competition`, hunting);
  }
  // POST request to add Hunting data
  addHuntingData(Hunting: Weight): Observable<Hunting> {
    return this.http.post<Hunting>(`${this.apiUrl}`, Hunting);
  }
}
