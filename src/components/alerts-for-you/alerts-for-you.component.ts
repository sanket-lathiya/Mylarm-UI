import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-alerts-for-you',
  templateUrl: './alerts-for-you.component.html',
  styleUrls: ['./alerts-for-you.component.scss']
})
export class AlertsForYouComponent implements OnInit, OnDestroy {

  result: any;
  alertList: any;
  subscription: Subscription;

  constructor(private alertService: AlertService, private toast: ToastrManager) { }

  ngOnInit() {
    //this.getMyAlerts();
    this.subscription = this.alertService.getAlertsForYouList().subscribe(alertList => this.alertList = alertList);
  }

  // getMyAlerts() {
  //   this.alertService.getAlertsForYou().subscribe(response => {
  //     this.result = response;
  //     if (this.result.status === 'success') {
  //       this.alertList = this.result.data.alertList;
  //     } else {
  //       this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
  //     }
  //   }, error => {
  //     this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
  //   });
  // }

  openLocation(latitude, longitude) {
    let url = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude;
    var win = window.open(url, '_blank');
    win.focus();
  }

  respondAlert(notificationId) {
    this.alertService.respondToAlert({ NOTIFICATION_ID: notificationId }).subscribe(response => {
      this.result = response;
      if (this.result.status === 'success') {
        //this.getMyAlerts();
      } else {
        this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
      }
    }, error => {
      this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
