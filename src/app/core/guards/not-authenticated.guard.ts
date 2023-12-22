import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const notAuthenticatedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  let tokenService = inject(TokenService);
  let router = inject(Router);
  if (token) {
    router.navigate(['**']);
    return false;
  } else {
    return true;
  }
};
