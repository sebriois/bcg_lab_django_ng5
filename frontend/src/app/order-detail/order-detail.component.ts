import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../orders/orders.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: OrderModel;
  constructor() { }

  ngOnInit() {
  }

  getTotalPrice(): number {
    return this.order.items.map(item => item.quantity * item.price).reduce((prevValue, currValue) => {
      return prevValue + currValue;
    }, 0);
  }
}
