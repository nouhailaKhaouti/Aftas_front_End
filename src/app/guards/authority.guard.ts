import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

export const authorityGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService); 
  
  return tokenService.getTokenClaims().authorities.includes(route.data['authority']);
};
