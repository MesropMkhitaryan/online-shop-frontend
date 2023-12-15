import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/user";
import {AuthenticationRequest} from "../model/authenticationRequest";
import {AuthenticationResponse} from "../model/authenticationResponse";
import {TokenService} from "./token.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  private booleanSubject = new BehaviorSubject<boolean>(true);

  boolean$: Observable<boolean> = this.booleanSubject.asObservable();

  setBooleanValue(value: boolean) {
    this.booleanSubject.next(value);
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public register(user: User) {
    return this.http.post<any>(`${this.apiBaseUrl}/api/v1/auth/register`, user);
  }

  public login(authenticationRequest: AuthenticationRequest){
    return this.http.post<AuthenticationResponse>(`${this.apiBaseUrl}/api/v1/auth/authenticate`, authenticationRequest)
  }
}
