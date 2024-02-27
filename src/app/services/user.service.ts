import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user-model';
import { Token } from '../model/token.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private url_user = 'http://localhost:8090/api/v1/auth/'; 

  constructor(private _http: HttpClient,private tokenService:TokenService,private router: Router) { }

  public RegisterUser(user: User): Observable<Token>{

    return this._http.post<Token>(this.url_user+'register',user);
  }

  public loginUser(user: User): Observable<Token>{

    return this._http.post<Token>(this.url_user+'authenticate',user);
  } 

  logout(): void {
    this._http.get<any>(`${this.url_user}/logout`).subscribe(success=>{
      this.router.navigate(['/login']);
    });
  }
  // refreshToken(dto:any): Observable<any> {
  //   return this.httpWithoutInterceptor.post<any>(`${this.url_user}/refresh`,dto);
  // }

  isAuthenticated(): boolean {
    return this.tokenService.getToken() !== null;
  }
}
