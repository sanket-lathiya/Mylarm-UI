import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latitude: string;
  longitude: string;
  groupId: Number;
  alert: any;
  result: any;

  constructor(private alertService: AlertService, private router: Router, private toast: ToastrManager) { }

  ngOnInit() {

  }

  raiseAlert(groupId) {
    this.groupId = groupId;
    this.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
      this.createAlert();
      this.alertService.raiseAlert(this.alert).subscribe(response => {
        this.result = response;
        if (this.result.status === 'success') {
          this.alertService.palySound.next(true);
          this.router.navigate(['/my-alerts']);
        } else {
          this.toast.errorToastr(this.result.error.errorMessage, 'Oops!', { toastTimeout: 2000 });
        }
      }, error => {
        this.toast.errorToastr('Something went wrong !!!', 'Oops!', { toastTimeout: 2000 });
      });
    }, error => {
      this.toast.errorToastr('Please give permission to access your location in emergency.', 'Oops!', { toastTimeout: 5000 });
    });
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      }, err => {
        reject(err);
      });
    });
  }

  createAlert() {
    this.alert = {}
    this.alert['GROUP_ID'] = this.groupId;
    this.alert['LATITUDE'] = this.latitude;
    this.alert['LONGITUDE'] = this.longitude;
  }

}
