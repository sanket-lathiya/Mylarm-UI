import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isSignUp: boolean = false;
  isOtp: boolean = false;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  pwd: string;
  cpwd: string;
  user: any;
  accessToken: string;
  result: any;
  otp: string;

  constructor(
    private toast: ToastrManager,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isSignUp = true;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  signUp() {
    if (this.validate()) {
      this.createUser();
      //this.storeService.startLoading();
      this.authService.signUp(this.user).subscribe((response) => {
        this.result = response;
        if (this.result.status === 'success') {
          this.accessToken = this.result.data.accessToken;
          this.isSignUp = false;
          this.isOtp = true;
        } else {
          this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
        }
        //this.storeService.stopLoading();
      }, error => {
        //this.storeService.stopLoading();
        this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
      });
    }
  }

  verifyOtp() {
    if (!this.otp) {
      this.toast.warningToastr('Please enter OTP received in your mobile number.', 'Alert!', { toastTimeout: 2000 });
      return;
    }
    //this.storeService.startLoading();
    this.authService.verifySignUpOtp(this.accessToken, this.otp).subscribe((response) => {
      this.result = response;
      if (this.result.status === 'success') {
        this.router.navigate(['/login']);
      } else {
        this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
      }
      //this.storeService.stopLoading();
    }, error => {
      //this.storeService.stopLoading();
      this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
    });
  }

  validate() {
    if (!this.mobileNumber) {
      this.toast.warningToastr('Please enter mobile number.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (!this.firstName) {
      this.toast.warningToastr('Please enter first name.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (!this.lastName) {
      this.toast.warningToastr('Please enter last name.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (!this.pwd) {
      this.toast.warningToastr('Please enter password.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (!this.cpwd) {
      this.toast.warningToastr('Please enter confirm password.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (this.pwd !== this.cpwd) {
      this.toast.warningToastr('Password mismatched.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (this.pwd.length < 8) {
      this.toast.warningToastr('Password must be of minimum 8 character long.', 'Alert!', { toastTimeout: 2000 });
      return false;
    }
    return true;
  }

  createUser() {
    this.user = {};
    this.user['MOBILE_NUMBER'] = "+91" + this.mobileNumber;
    this.user['FIRST_NAME'] = this.firstName;
    this.user['LAST_NAME'] = this.lastName;
    this.user['PWD'] = this.pwd;
  }

}
