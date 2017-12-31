import {Component, isDevMode, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mode = 'DEV';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (isDevMode()) {
      this.mode = undefined;
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
