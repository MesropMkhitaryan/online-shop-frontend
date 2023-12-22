import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) { }

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkAuthenticationStatus());

  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  updateAuthenticationStatus(): void {
    this.isAuthenticatedSubject.next(this.checkAuthenticationStatus());
  }

  private checkAuthenticationStatus(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    if (localStorage.getItem('token') !== null){
      localStorage.removeItem('token')
      this.updateAuthenticationStatus()
      this.route.navigate(['home'])
    }
  }
}
