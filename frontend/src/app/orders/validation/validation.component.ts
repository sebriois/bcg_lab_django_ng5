import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {OrderModel} from '../orders.model';
import {Observable} from 'rxjs/Observable';
import {AlertService} from '../../alerts/alerts.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(private alertService: AlertService, private orderService: OrderService) { }

  orders: Observable<OrderModel[]>;
  loading = false;

  ngOnInit() {
    this.orders = this.orderService.getOrders();
    this.loading = true;
    this.orderService.retrieveOrders(1).subscribe(() => {
      this.loading = false;
    });
  }

}
