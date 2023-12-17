import {Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductResponse} from "../model/productResponse";
import {ProductRequest} from "../model/request/productRequest";
import {TokenService} from "./token.service";
import {ProductEditRequest} from "../model/request/productEditRequest";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token: string = this.tokenService.getToken()

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

  public httpOptionsForAuthenticated = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };

  public addProduct(productRequest: ProductRequest): Observable<ProductResponse>{
    return this.http.post<ProductResponse>(`${this.apiBaseUrl}/api/v1/product/create`, productRequest, this.httpOptionsForAuthenticated)
  }

  public myProductList(): Observable<ProductResponse[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/v1/product/getProductByUserId`, this.httpOptionsForAuthenticated);
  }

  public productList(): Observable<ProductResponse[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/v1/product/list`, this.httpOptionsForNonAuthenticated);
  }

  getImage(fileName: string | any) {
    return this.http.get(`${this.apiBaseUrl}/api/v1/product/getProductPic/${fileName}`, this.httpOptionsForAuthenticated);
  }

  findById(productId: string){
    return this.http.get<ProductResponse>(`${this.apiBaseUrl}/api/v1/product/find/${productId}`)
  }

  findByToken(){
    return this.http.get<string>(`${this.apiBaseUrl}/api/v1/product/getUser`, this.httpOptionsForAuthenticated)
  }


  uploadImage(productId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);
    return this.http.post(`${this.apiBaseUrl}/api/v1/product/upload/${productId}`, formData, this.httpOptionsImgUpload);
  }

  deleteProduct(productId: string | any) {
    return  this.http.delete<void>(`${this.apiBaseUrl}/api/v1/product/delete/${productId}`, this.httpOptionsForAuthenticated)
  }

  editProduct(edit: ProductEditRequest, productId: string) {
    return  this.http.put<void>(`${this.apiBaseUrl}/api/v1/product/update/${productId}`, edit, this.httpOptionsForAuthenticated)
  }
}
