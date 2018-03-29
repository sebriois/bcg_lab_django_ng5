import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {OrderService} from '../services/order.service';
import {AuthService} from "../services/auth.service";
import {UserModel} from '../users/user.model';

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


  ngOnInit() {
  }

}
