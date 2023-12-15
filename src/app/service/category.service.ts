import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryResponse} from "../model/categoryResponse";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllCategories():Observable<CategoryResponse[]>{
    return this.http.get<any>(`${this.apiBaseUrl}/api/v1/category/list`)
  }

}
