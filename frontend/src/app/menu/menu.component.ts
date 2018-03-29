import {Component, isDevMode, OnInit} from '@angular/core';
import {AlertService} from "../alerts/alerts.service";
import {AuthService} from "../services/auth.service";
import {OutageService} from "../services/outage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public mode = undefined;
  public isCollapsed: boolean = false;
  public currentUser = this.authService.getCurrentUser();
  public outage = this.outageService.isOutOfOrder;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private outageService: OutageService
  ) { }

  ngOnInit() {
    if (isDevMode()) {
      this.mode = 'DEV';
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
