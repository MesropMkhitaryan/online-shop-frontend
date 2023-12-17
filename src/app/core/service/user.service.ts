import {Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {AuthenticationRequest} from "../model/request/authenticationRequest";
import {AuthenticationResponse} from "../model/authenticationResponse";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
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
