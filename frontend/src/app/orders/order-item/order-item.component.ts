import {Component, Input, OnInit} from '@angular/core';
import {OrderItemModel} from '../orders.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order_item: OrderItemModel;

  constructor() { }

  ngOnInit() {
  }

}
