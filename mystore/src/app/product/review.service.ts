import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:4100/product-review'

  constructor(
    private http: HttpClient) { }

  getProductReviews(id: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url + "/" + id, httpOptions)
  }

  addProductReviews(id: number, review: string, rating: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      review: review,
      rating: rating
    }

    return this.http.post(this.url + "/" + id, body, httpOptions)
  }
}
