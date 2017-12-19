import {Pipe, PipeTransform} from '@angular/core';
import {OrderModel} from './orders.model';

@Pipe({
  name: 'statusFilter'
})

export class StatusFilterPipe implements PipeTransform {
  transform(orders: OrderModel[], filter: number): any {
    if (!orders || !filter) {
      return orders;
    }
    return orders.filter(order => order.status === filter);
  }
}
