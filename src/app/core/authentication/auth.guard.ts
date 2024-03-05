import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

export const authGuard = (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  const auth = inject(LoginService);
  const router = inject(Router);

  return auth.verifyToken() ? true : router.parseUrl('/auth/login');
};
