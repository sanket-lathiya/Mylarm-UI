import { AuthService } from 'src/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subsciption: Subscription;
  isLogin: boolean = false;

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.subsciption = this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLogin = isLoggedIn);
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

}
