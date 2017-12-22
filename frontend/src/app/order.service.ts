import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {OrderModel} from './orders/orders.model';


@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.apiUrl + '/orders/';
  private _orders: Array<OrderModel> = [];
  protected _ordersSubject: BehaviorSubject<OrderModel[]> = new BehaviorSubject<OrderModel[]>([]);

  getOrders(): Observable<OrderModel[]> {
    return this._ordersSubject.asObservable();
  }

  retrieveOrders(): Observable<any> {
    return this.http.get<OrderModel[]>(this.baseUrl).map(orders => {
      console.log('Retrieving orders');
      this._orders = orders;
      this._ordersSubject.next(this._orders);
    });
  }

  createOrder(order: OrderModel): Observable<any> {
    return this.http.post<OrderModel>(this.baseUrl, order).map(createdOrder => {
      return createdOrder;
    });
  }
}
