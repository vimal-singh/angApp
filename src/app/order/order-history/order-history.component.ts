import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders = []

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.orderService
      .getOrders()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.orders = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onCancelOrder(order) {
    this.orderService
      .cancelOrder(order.id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.toastr.success('Cancelled your order')
          this.loadOrders()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

}
