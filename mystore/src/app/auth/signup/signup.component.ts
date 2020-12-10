import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName = ''
  lastName = ''
  email = ''
  phone = ''
  password = ''
  confirmPassword = ''

  constructor(
    private router: Router,
    private service: AuthService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  onSignup() {
    if (this.firstName.length == 0) {
      this.toaster.warning('please enter first name')
    } else if (this.lastName.length == 0) {
      this.toaster.warning('please enter last name')
    } else if (this.email.length == 0) {
      this.toaster.warning('please enter email name')
    } else if (this.phone.length == 0) {
      this.toaster.warning('please enter phone name')
    } else if (this.password.length == 0) {
      this.toaster.warning('please enter password')
    } else if (this.confirmPassword.length == 0) {
      this.toaster.warning('please confirm password')
    } else if (this.password != this.confirmPassword) {
      this.toaster.warning('password does match')
    } else {
      this.service
        .signup(this.firstName, this.lastName, this.phone, this.email, this.password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.toaster.success('succesfully signed up new account')
            this.router.navigate(['/auth/signin'])
          } else {
            this.toaster.error(response['error'])
          }
        })
    }
  }
}
