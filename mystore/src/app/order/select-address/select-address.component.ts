import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/user/address.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {

  addresses = []

  constructor(
    private orderService: OrderService,
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private service: AddressService) { }

  ngOnInit(): void {
    this.loadAddresses()
  }

  loadAddresses() {
    this.service
      .getAddresses()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.addresses = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      }) 
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }

  onSelect(address) {
    this.orderService
      .placeOrder(address.id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.toastr.success('Congratulations!!! Placed your order')
          this.modal.dismiss('ok')
        } else {
          this.toastr.error(response['error'])
        }
      })
  }
}
