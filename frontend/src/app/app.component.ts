import {Component, isDevMode, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {UserModel} from './users/user.model';
import {AlertService} from './alerts/alerts.service';
import {OutageService} from "./services/outage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.retrieveCurrentUser();
  }

}
