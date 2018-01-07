import {Pipe, PipeTransform} from '@angular/core';
import {OrderModel} from './orders.model';

@Pipe({
  name: 'orderFilter'
})

export class OrderFilterPipe implements PipeTransform {
  transform(orders: OrderModel[], filters: {}): any {

    return orders.filter(order => {
      // make sure order fields match all filters
      for ( let i = 0 ; i < Object.keys(filters).length ; i++ ) {
        let filterKey = Object.keys(filters)[i];
        if (order.hasOwnProperty(filterKey) && order[filterKey] !== filters[filterKey]) {
          return false;
        }
      }

      return true;
    });
  }
}
