import { HttpClient, HttpParams } from '@angular/common/http';
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
  getCompetitionData(params: any): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', params['page'])
      .set('size', params['size']);
  
    if (params['code'] !== undefined) {
      httpParams = httpParams.set('code', params['code']);
    }
  
    return this.http.post<any>(`${this.apiUrl}Competitions`, null, {
      reportProgress: true,
      params: httpParams
    });
  }

  getMemberCompetitions(params: any): Observable<any> {
    let httpParams = new HttpParams()
      .set('num', params['num']);
    return this.http.post<any>(`${this.apiUrl}`, null, {
      reportProgress: true,
      params: httpParams
    });
  }

  // POST request to add competition data
  addCompetitionData(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(`${this.apiUrl}`, competition);
  }
}
