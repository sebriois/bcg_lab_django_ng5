import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {UserService} from '../users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      console.log('[auth guard] logged in!');
      // logged in, verify token
      const isVerified = this.authService.verifyToken().subscribe(isLoggedIn => {
        return isLoggedIn;
      });
      if (isVerified) {
        return true;
      }
    }
    console.error('[auth guard] NOT logged in!');

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = state.url;

    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
