import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mylarm',
  templateUrl: './mylarm.component.html',
  styleUrls: ['./mylarm.component.scss']
})
export class MylarmComponent implements OnInit, OnDestroy {

  subsciption: Subscription;
  
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.subsciption = this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

}
