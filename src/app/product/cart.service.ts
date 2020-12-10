import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = 'http://localhost:4100/cart'

  constructor(
    private http: HttpClient) { }

  getCartItems() {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }

  addItemToCart(productId: number, price: number, quantity: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      productId: productId,
      price: price,
      quantity: quantity
    }

    return this.http.post(this.url, body, httpOptions)
  }
  
  updateItemToCart(id: number, quantity: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      quantity: quantity
    }

    return this.http.put(this.url + "/" + id, body, httpOptions)
  }

  deleteItemFromCart(id: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.delete(this.url + "/" + id, httpOptions)
  }
}
