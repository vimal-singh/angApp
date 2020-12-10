import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private url = 'http://localhost:4100/brand'

  constructor(
    private http: HttpClient) { }
  
  getBrands() {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }
    return this.http.get(this.url, httpOptions)
  }
}
