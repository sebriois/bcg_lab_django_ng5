import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {OrderModel} from '../orders.model';
import {Observable} from 'rxjs/Observable';
import {AlertService} from '../../alerts/alerts.service';
import {UserService} from '../../users/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private orderService: OrderService,
    private userService: UserService
  ) { }

  orders: Observable<OrderModel[]>;
  loading: boolean;

  ngOnInit() {
    this.orders = this.orderService.getOrders();
    this.loading = true;
    this.orderService.retrieveOrders(0).subscribe(() => {
      this.loading = false;
    });
  }

}

