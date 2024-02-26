import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getREfreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  saveUser(firstName : string,lastName : string ,email: string){
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);

  }
}
