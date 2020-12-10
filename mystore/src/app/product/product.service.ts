import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:4100/product'

  constructor(
    private http: HttpClient) { }

  getProductInfo(id: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url + "/details/" + id, httpOptions)
  }

  filterProducts(categoryId: number, brandId: number) {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      categoryId: categoryId,
      brandId: brandId
    }

    return this.http.post(this.url + "/filter", body, httpOptions)
  }
}
