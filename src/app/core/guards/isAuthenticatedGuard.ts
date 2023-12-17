import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  let tokenService = inject(TokenService);
  let router = inject(Router);
  if (token && !tokenService.isTokenExpired(token)) {
    return true;
  } else {
    router.navigate(['**']);
    return false;
  }
};
