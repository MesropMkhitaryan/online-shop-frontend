import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public apiBaseUrl = environment.apiBaseUrl;
  token = localStorage.getItem('token')

  constructor(private http: HttpClient) {
  }


  public httpOptionsForAuthenticated = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  };

  getBucket(){
    return this.http.get(`${this.apiBaseUrl}/api/v1/bucket/get`, this.httpOptionsForAuthenticated)
  }

  addProductToBucket(productId: string | undefined) {
    if (!productId) {
      console.error("productId is undefined");
      return;
    }

    const url = `${this.apiBaseUrl}/api/v1/bucket/add/${productId}`;

    // Assuming this.httpOptionsForAuthenticated includes the Authorization header

    this.http.post(url, null, this.httpOptionsForAuthenticated)
      .subscribe(
        () => {
          console.log("Product added to bucket successfully");
          // Handle success, if needed
        },
        (error) => {
          console.error("Error adding product to bucket", error);
          // Handle error, if needed
        }
      );

  }

  deleteProductFromBucket(productId: string | any) {
    return this.http.delete<void>(`${this.apiBaseUrl}/api/v1/bucket/delete/${productId}`,this.httpOptionsForAuthenticated);
  }


}
