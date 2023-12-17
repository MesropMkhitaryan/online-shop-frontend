import {Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {OrderRequest} from "../model/request/orderRequest";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public httpOptionsForNonAuthenticated = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public httpOptionsImgUpload = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`,
    })
  };

  orderProduct(orderRequest: OrderRequest){
    return this.http.post<any>(`${this.apiBaseUrl}/api/v1/order/product`,orderRequest,this.httpOptionsImgUpload)
  }

}
