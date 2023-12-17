import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:8090/Aftas/api/member/';

  constructor(private http: HttpClient) { }


  getMembersData(params: any): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', params['page'])
      .set('size', params['size']);
  
    if (params['search'] !== undefined) {
      httpParams = httpParams.set('search', params['search']);
    }
  
    return this.http.post<any>(`${this.apiUrl}Members`, null, {
      reportProgress: true,
      params: httpParams
    });
  }

  // // GET request to fetch Member data
  // getMembersData(params: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/Members`, { params });
  // }

  // POST request to add Member data
  addMemberData(Member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}`, Member);
  }
}
