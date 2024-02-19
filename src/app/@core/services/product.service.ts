import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';
import { ApiOptions } from '../models/api-opitons';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl + "/products";

  constructor(private httpClient: HttpClient) { }

  getProducts(options: ApiOptions): Observable<HttpResponse<Product[]>> {
    let queryParams = [];
    queryParams.push("_page=" + (options.currentPage || 10));
    queryParams.push("_sort=" + (options.column || "id"));
    queryParams.push("_order=" + (options.direction || "desc"));
    queryParams.push("_limit=" + (options.itemsPerPage || 5));
    queryParams.push("q=" + (options.keyword || ""));
    const queryParamsUrl = queryParams.join("&");

    return this.httpClient.get<Product[]>(this.baseUrl + `?${queryParamsUrl}`, {
      observe: "response"
    });
  }

  createProduct(data: Product): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  updateProduct(productId: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${productId}`, data);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${productId}`)
  }

  getDataForChart(): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.baseUrl, {
      observe: "response",
    });
  }
}
