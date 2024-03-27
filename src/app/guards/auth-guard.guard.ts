import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  
  if(authService.currentUserSig()){
    return true;
  }
  return false;
};
