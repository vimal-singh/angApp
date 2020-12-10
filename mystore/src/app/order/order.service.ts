import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:4100/order'

  constructor(
    private http: HttpClient) { }

  getOrders() {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }

  cancelOrder(id) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.delete(this.url + '/cancel/' + id, httpOptions)
  }

  placeOrder(addressId: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      addressId: addressId
    }

    return this.http.post(this.url, body, httpOptions)
  }
}
