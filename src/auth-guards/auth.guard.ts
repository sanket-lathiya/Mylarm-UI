import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn && !this.authService.getLoginFromLocalStorage()) {
          this.router.navigate(['']);
          return false;
        } else if (!isLoggedIn && this.authService.getLoginFromLocalStorage()) {
          this.authService.setLogin(this.authService.getLoginFromLocalStorage());
        }
        return true;
      })
    );
  }

}