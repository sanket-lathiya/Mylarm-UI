import { AlertService } from './../../services/alert.service';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subsciption: Subscription;
  soundSubscription: Subscription;
  isLogin: boolean = false;
  audio: any;
  isPlay: boolean = false;

  constructor(private route: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.subsciption = this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLogin = isLoggedIn);
    this.soundSubscription = this.alertService.isPlaySound().subscribe(play => {
      if (play) {
        this.isPlay = true;
        this.playAudio();
      }
    });
    this.audio = new Audio();
    this.audio.src = "../assets/emergency_tone_6.mp3";
    this.audio.load();
    //this.audio.play();
  }

  playAudio() {
    this.audio.play();
  }

  pauseAudio() {
    this.isPlay = false;
    this.audio.pause();
    this.alertService.palySound.next(false);
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
    this.soundSubscription.unsubscribe();
  }

}
