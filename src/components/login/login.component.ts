import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogIn: boolean = false;
  isOtp: boolean = false;
  isForgetPwd: boolean = false;
  isNewPwd: boolean = false;
  showNewPwd: boolean = false;
  mobileNumber: string;
  pwd: string;
  newPwd: string;
  accessToken: string;
  result: any;
  otp: string;
  loginWithOtp: boolean = false;
  loginWithPwd: boolean = false;

  constructor(
    private toast: ToastrManager,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogIn = true;
    this.loginWithPwd = true;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  logIn() {
    if (!this.mobileNumber) {
      this.toast.warningToastr('Please enter mobile number.', 'Alert!', { toastTimeout: 2000 });
      return false;
    }
    if (this.loginWithPwd) {
      if (!this.pwd) {
        this.toast.warningToastr('Please enter password.', 'Alert!', { toastTimeout: 2000 });
        return false;
      }
      //this.storeService.startLoading();
      this.authService.logInWithPwd({ MOBILE_NUMBER: "+91" + this.mobileNumber, PWD: this.pwd }).subscribe((response) => {
        this.result = response;
        if (this.result.status === 'success') {
          this.authService.setLogin(this.result.data.accessToken)
          //this.storeService.stopLoading();
          this.router.navigate(['/home']);
        } else {
          this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
        }
        //this.storeService.stopLoading();
      }, error => {
        //this.storeService.stopLoading();
        this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
      });
    } else {
      this.sendOtp();
    }
  }

  sendForgetPwdOtp() {
    this.sendOtp();
  }

  sendOtp() {
    //this.storeService.startLoading();
    this.authService.sendOtp({ MOBILE_NUMBER: "+91" + this.mobileNumber }).subscribe((response) => {
      this.result = response;
      if (this.result.status === 'success') {
        this.accessToken = this.result.data.accessToken;
        this.isLogIn = false;
        if (this.isForgetPwd) {
          this.isNewPwd = true;
        }
        this.isForgetPwd = false;
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

  verifyOtp() {
    if (!this.otp) {
      this.toast.warningToastr('Please enter OTP received in your mobile number.', 'Alert!', { toastTimeout: 2000 });
      return;
    }
    //this.storeService.startLoading();
    this.authService.verifyOtp(this.accessToken, this.otp).subscribe((response) => {
      this.result = response;
      if (this.result.status === 'success') {
        if (this.isNewPwd) {
          this.accessToken = this.result.data.accessToken;
          this.isOtp = false;
          this.showNewPwd = true;
        } else {
          this.authService.setLogin(this.result.data.accessToken);
          //this.storeService.stopLoading();
          this.router.navigate(['/home']);
        }
      } else {
        this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
      }
      //this.storeService.stopLoading();
    }, error => {
      //this.storeService.stopLoading();
      this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
    });
  }

  setNewPwd() {
    if (!this.newPwd) {
      this.toast.warningToastr('Please enter password.', 'Alert!', { toastTimeout: 2000 });
      return false;
    } else if (this.newPwd.length < 8) {
      this.toast.warningToastr('Password must be of minimum 8 character long.', 'Alert!', { toastTimeout: 2000 });
      return false;
    }
    //this.storeService.startLoading();
    this.authService.setNewPwd(this.accessToken, this.newPwd).subscribe((response) => {
      this.result = response;
      if (this.result.status === 'success') {
        //this.storeService.stopLoading();
        this.showNewPwd = false;
        this.isLogIn = true;
      } else {
        this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
      }
      //this.storeService.stopLoading();
    }, error => {
      //this.storeService.stopLoading();
      this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
    });
  }

  enableLoginWithOtp() {
    this.loginWithPwd = false;
    this.loginWithOtp = true;
    this.isLogIn = true;
    this.isForgetPwd = false;
  }

  enableLoginWithPwd() {
    this.loginWithOtp = false;
    this.loginWithPwd = true;
    this.isLogIn = true;
    this.isForgetPwd = false;
  }

  enableForgetPwd() {
    this.isLogIn = false;
    this.isForgetPwd = true;
  }

}

