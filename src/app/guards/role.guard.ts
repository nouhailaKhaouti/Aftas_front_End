import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const tokenService: TokenService = inject(TokenService);
  
  
  // return tokenService.getTokenClaims().role === route.data['role'];
  // check if the user has the role required to access the route in data as an array
  return route.data['role'].includes(tokenService.getTokenClaims().role);
};
