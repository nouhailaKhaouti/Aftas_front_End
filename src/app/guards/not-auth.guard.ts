import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const userService : UserService = inject(UserService);
  const router : Router = inject(Router);
  
  if (userService.isAuthenticated()) {
    router.navigate([router.url]);
    return false;
  } else {
    return true;
  }
};
