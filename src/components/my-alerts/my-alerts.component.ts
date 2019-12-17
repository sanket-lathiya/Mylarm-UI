import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-alerts',
  templateUrl: './my-alerts.component.html',
  styleUrls: ['./my-alerts.component.scss']
})
export class MyAlertsComponent implements OnInit, OnDestroy {

  result: any;
  alertList: any;
  subscription: Subscription;

  constructor(private alertService: AlertService, private toast: ToastrManager) { }

  ngOnInit() {
    //this.getMyAlerts();
    this.subscription = this.alertService.getMyAlertList().subscribe(alertList => this.alertList = alertList);
  }

  // getMyAlerts() {
  //   this.alertService.getMyAlerts().subscribe(response => {
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

  stopAlert(notificationId) {
    this.alertService.stopAlert({ NOTIFICATION_ID: notificationId }).subscribe(response => {
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
