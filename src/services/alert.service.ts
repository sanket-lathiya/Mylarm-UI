import { AuthService } from 'src/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../configs/config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public palySound: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public myAlertList: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  public alertsForYouList: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  private alertsForYouCount: Number = 0;

  constructor(private http: HttpClient, private authService: AuthService) { }

  isPlaySound() {
    return this.palySound.asObservable();
  }

  raiseAlert(alert) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.post(backend_url + '/mylarm/raise-alert', alert, { headers })
      .pipe(res => {
        return res;
      });
  }

  getMyAlertList() {
    return this.myAlertList.asObservable();
  }

  getAlertsForYouList() {
    return this.alertsForYouList.asObservable();
  }

  getMyAlerts() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.get(backend_url + '/mylarm/my-alerts', { headers })
      .subscribe((res: any) => {
        this.myAlertList.next(res.data.alertList);
      });
  }

  stopAlert(alert) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.post(backend_url + '/mylarm/close-alert', alert, { headers })
      .pipe(res => {
        return res;
      });
  }

  getAlertsForYou() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.get(backend_url + '/mylarm/alerts-for-me', { headers })
      .subscribe((res: any) => {
        if (this.alertsForYouCount !== res.data.alertList.length) {
          this.alertsForYouCount = res.data.alertList.length;
          this.palySound.next(true);
        }
        this.alertsForYouList.next(res.data.alertList);
      });
  }

  respondToAlert(alert) {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.http.post(backend_url + '/mylarm/respond-to-alert', alert, { headers })
      .pipe(res => {
        return res;
      });
  }

  refreshInterval = setInterval(() => {
    if (this.authService.token !== '') {
      this.getMyAlerts();
      //this.getAlertsForYou();
    }
  }, 1000 * 7);

  refreshInterval1 = setInterval(() => {
    if (this.authService.token !== '') {
      //this.getMyAlerts();
      this.getAlertsForYou();
    }
  }, 1000 * 5);

}
