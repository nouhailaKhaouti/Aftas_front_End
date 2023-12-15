import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:8090/Aftas/api/member/';

  constructor(private http: HttpClient) { }

  // GET request to fetch Member data
  getMemberData(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}`);
  }

  // POST request to add Member data
  addMemberData(Member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}`, Member);
  }
}
