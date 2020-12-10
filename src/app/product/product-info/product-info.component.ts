import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  review = ''
  rating = 0

  reviews = []
  product = undefined

  constructor(
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this id is of the selected product
    const id = this.activatedRoute.snapshot.queryParams['id']
    this.productService
      .getProductInfo(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.product = response['data']
          this.getProductReviews()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  getProductReviews() {
    this.reviewService
      .getProductReviews(this.product.id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.reviews = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onSubmitReview() {
    this.reviewService
      .addProductReviews(this.product.id, this.review, this.rating)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.toastr.success('thanks for reviewing the product')
          this.getProductReviews()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

}
