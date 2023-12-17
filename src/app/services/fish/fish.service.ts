import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fish } from 'src/app/model/fish.model';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  private apiUrl = 'http://localhost:8090/Aftas/api/fish/';

  constructor(private http: HttpClient) { }

  // GET request to fetch Fish data
  getFishData(): Observable<Fish[]> {
    return this.http.get<Fish[]>(`${this.apiUrl}`);
  }

}
