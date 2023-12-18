import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";

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
    this.http.post(url, null, this.httpOptionsForAuthenticated)
      .subscribe(
        () => {
          console.log("Product added to bucket successfully");
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
