import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {OrderService} from "../order.service";
import {AlertService} from "../../alerts/alerts.service";
import {OrderModel} from "../orders.model";

@Component({
  selector: 'app-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private orderService: OrderService
  ) { }

  orders: Observable<OrderModel[]>;

  ngOnInit() {
    this.orders = this.orderService.getOrders().map(orders => {
      return orders.filter(order => order.status === 2);
    });
  }

}
