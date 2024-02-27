import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Token } from '@angular/compiler';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ){}

  private refreshCount = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      
      catchError(error=> {
        
        
        if (error.status === 403) {
          this.userService.logout();
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
