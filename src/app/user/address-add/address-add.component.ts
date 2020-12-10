import { AddressService } from './../address.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {

  line1 = ''
  line2 = ''
  city = ''
  state = ''
  title = ''
  zipCode = ''

  constructor(
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private service: AddressService) { }

  ngOnInit(): void {
  }

  onAdd() {
    console.log(`title: ${this.title}`)
    if (this.title.length == 0) {
      this.toastr.warning('please enter title')
    } else if (this.line1.length == 0) {
      this.toastr.warning('please enter line 1')
    } else if (this.line2.length == 0) {
      this.toastr.warning('please enter line 2')
    } else if (this.city.length == 0) {
      this.toastr.warning('please enter city')
    } else if (this.state.length == 0) {
      this.toastr.warning('please enter state')
    } else if (this.zipCode.length == 0) {
      this.toastr.warning('please enter zip code')
    } else {
      this.service
        .addAddress(this.title, this.line1, this.line2,
            this.city, this.state, this.zipCode)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.modal.dismiss('ok')
          } else {
            this.toastr.error(response['error'])
          }
        })
    }
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }

}
