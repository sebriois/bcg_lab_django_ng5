import {Component, Input, OnInit} from '@angular/core';
import {OrderItemModel, OrderModel} from '../orders/orders.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: OrderModel;
  private isValid: boolean;

  constructor() { }

  ngOnInit() {
  }

  getTotalPrice(): number {
    return this.order.items.map(item => item.quantity * item.price).reduce((prevValue, currValue) => {
      return prevValue + currValue;
    }, 0);
  }

  hasError(item: OrderItemModel): boolean {
    if ( item.nomenclature === '' || item.nomenclature === undefined ) {
      this.isValid = false;
      return true;
    }
    this.isValid = true;
    return false;
  }
  nextStatus(): void {
    console.log('next status');
  }
  toggleUrgent() {
    this.order.is_urgent = !this.order.is_urgent;
  }
  toggleProblem() {
    this.order.has_problem = !this.order.has_problem;
  }
  toggleConfidential() {
    this.order.is_confidential = !this.order.is_confidential;
  }
}
