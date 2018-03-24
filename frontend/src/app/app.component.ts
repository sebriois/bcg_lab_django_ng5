import {Component, isDevMode, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {UserModel} from './users/user.model';
import {AlertService} from './alerts/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mode = 'DEV';
  isCollapsed: boolean = false;
  currentUser = this.authService.getCurrentUser();

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (isDevMode()) {
      this.mode = undefined;
    }
    this.authService.retrieveCurrentUser();
    if (this.isLoggedIn()) {
      this.authService.refreshToken().subscribe(hasRefreshed => {
        console.log('token refreshed: ', hasRefreshed);
      }, error => {
        console.error(error);
        this.alertService.error(error);
      });
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
