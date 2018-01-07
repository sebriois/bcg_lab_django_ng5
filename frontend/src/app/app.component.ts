import {Component, isDevMode, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mode = 'DEV';
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (isDevMode()) {
      this.mode = undefined;
    }
  }

  isLoggedIn() {
    this.username = this.authService.username;
    return this.authService.isLoggedIn;
  }
}
