import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs/Observable';
import {OrderModel} from './orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private alertService: AlertService, private orderService: OrderService) { }

  orders: Observable<OrderModel[]>;
  currentStatus = 0;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.orders = this.orderService.getOrders();
    this.orderService.retrieveOrders().subscribe(response => {
      this.loading = false;
    });
  }

  viewCart(): void {
    this.currentStatus = 0;
  }
}
