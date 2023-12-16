import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/model/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {

  private apiUrl = 'http://localhost:8090/Aftas/api/ranking/';

  constructor(private http: HttpClient) { }

  // GET request to fetch Register data
  getRegisterData(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.apiUrl}`);
  }

  // POST request to add Register data
  addRegisterData(Register: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}`, Register);
  }
}
