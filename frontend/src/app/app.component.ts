import {Component, isDevMode, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {UserModel} from './users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mode = 'DEV';
  isCollapsed: boolean = false;
  currentUser: UserModel;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (isDevMode()) {
      this.mode = undefined;
    }
    this.currentUser = this.authService.getCurrentUser();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
