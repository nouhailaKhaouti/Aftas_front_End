import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/model/ranking.model';
import { Register } from 'src/app/model/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {

  private apiUrl = 'http://localhost:8090/Aftas/api/ranking/';

  constructor(private http: HttpClient) { }

  // GET request to fetch Register data
  getRegisterData(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.apiUrl}`);
  }

  // GET request to fetch Register data based on a specific code
  getRegisterDataByCode(code: string): Observable<Ranking[]> {
    const url = `${this.apiUrl}${code}`;
    return this.http.get<Ranking[]>(url);
  }

  // POST request to add Register data
  addRegisterData(Register: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}`, Register);
  }
}
