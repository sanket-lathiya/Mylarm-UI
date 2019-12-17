import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../configs/config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public token: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn;
  }

  signUp(user) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(backend_url + '/auth/signup', user, { headers })
      .pipe(res => {
        return res;
      });
  }

  verifySignUpOtp(token, OTP) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(backend_url + '/auth/verify-signup-otp', { OTP }, { headers })
      .pipe(res => {
        return res;
      });
  }

  logInWithPwd(payload) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(backend_url + '/auth/pwd-login', payload, { headers })
      .pipe(res => {
        return res;
      });
  }

  sendOtp(payload) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(backend_url + '/auth/send-otp', payload, { headers })
      .pipe(res => {
        return res;
      });
  }

  verifyOtp(token, OTP) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(backend_url + '/auth/verify-otp', { OTP }, { headers })
      .pipe(res => {
        return res;
      });
  }

  setNewPwd(token, NEW_PWD) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(backend_url + '/auth/update-pwd', { NEW_PWD }, { headers })
      .pipe(res => {
        return res;
      });
  }

  setLogin(token: string) {
    this.loggedIn.next(true);
    this.token = token;
    localStorage.setItem('Mylarm', token);
  }

  getLoginFromLocalStorage() {
    return localStorage.getItem('Mylarm');
  }

  // refreshInterval = setInterval(() => {
  //   if (this.storeService.token !== '')
  //     this.refreshToken();
  // }, 1000 * 60 * 30);

  // refreshToken() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.storeService.token
  //   });
  //   this.http.get(backend_url + '/auth/refresh-token', { headers })
  //     .subscribe((res: any) => {
  //       this.storeService.setToken(res.data.accessToken);
  //     });
  // }

  logout() {
    this.loggedIn.next(false);
    this.token = '';
    localStorage.removeItem('Mylarm');
    this.router.navigate(['']);
  }

}
