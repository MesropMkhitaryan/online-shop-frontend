import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const guard: CanActivateFn = (route, state) => {
  let tokenService = inject(TokenService);
  return tokenService.isTokenActive();
};
