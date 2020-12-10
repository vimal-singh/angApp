import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email = ''
  password = ''
 
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private service: AuthService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  onSignin() {
    if (this.email.length == 0) {
      this.toaster.warning('please enter email name')
    } else if (this.password.length == 0) {
      this.toaster.warning('please enter password')
    } else {
      this.service
        .signin(this.email, this.password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.toastr.success('welcome')
            
            // cache the user details along with the token
            const user = response['data']
            sessionStorage['user_name'] = user['firstName'] + ' ' + user['lastName']
            sessionStorage['token'] = user['token']

            this.router.navigate(['/home/'])
          } else {
            this.toaster.error(response['error'])
          }
        })
    }
  }

}
