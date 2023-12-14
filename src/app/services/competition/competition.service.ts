import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition } from 'src/app/model/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private apiUrl = 'http://localhost:8090/Aftas/api/competition/';

  constructor(private http: HttpClient) { }

  // GET request to fetch competition data
  getCompetitionData(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${this.apiUrl}`);
  }

  // POST request to add competition data
  addCompetitionData(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(`${this.apiUrl}`, competition);
  }
}
