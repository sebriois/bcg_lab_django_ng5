import {Component, isDevMode, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthService} from "./auth/auth.service";
import {UserService} from "./users/user.service";
import {UserModel} from "./users/user.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mode = 'DEV';
  loggedInUser: UserModel;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (isDevMode()) {
      this.mode = undefined;
    }
  }

  isLoggedIn() {
    if (this.authService.isLoggedIn) {
      this.loggedInUser = this.authService.loggedInUser;
    }
    return this.authService.isLoggedIn;
  }
}
