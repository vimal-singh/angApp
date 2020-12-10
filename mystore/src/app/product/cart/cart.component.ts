import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectAddressComponent } from 'src/app/order/select-address/select-address.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = []
  totalPrice = 0

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems()
  }

  loadCartItems() {
    this.cartService
      .getCartItems()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.totalPrice = 0
          this.products = response['data']
          this.products.forEach(product => {
            this.totalPrice += (product.quantity * product.price)
          })
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  reduceQuantity(product) {
    const quantity = product.quantity - 1
    this.updateQuantity(product.id, quantity)
  }

  increaseQuantity(product) {
    const quantity = product.quantity + 1
    this.updateQuantity(product.id, quantity)
  }

  updateQuantity(id, quantity) {
    if (quantity == 0) {
      // delete the item from cart
      this.cartService
        .deleteItemFromCart(id)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.loadCartItems()
          } else {
            this.toastr.error(response['error'])
          }
        })
    } else {
      this.cartService
        .updateItemToCart(id, quantity)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.loadCartItems()
          } else {
            this.toastr.error(response['error'])
          }
        })
    }
  }

  onPlaceOrder() {
    const modalRef = this.modalService.open(SelectAddressComponent, {size: 'lg'})
    modalRef.result.finally(() => {
      this.loadCartItems()
    })
  }
}
