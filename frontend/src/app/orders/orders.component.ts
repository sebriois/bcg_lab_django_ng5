import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {OrderService} from './order.service';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  currentUser = this.authService.loggedInUser;

  ngOnInit() {
  }

}
