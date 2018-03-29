import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {OrderModel} from '../models/orders.model';
import {ProductModel} from "../models/products.model";


@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.apiUrl;
  private _orders: Array<OrderModel> = [];
  protected _ordersSubject: BehaviorSubject<OrderModel[]> = new BehaviorSubject<OrderModel[]>([]);

  getOrders(): Observable<OrderModel[]> {
    return this._ordersSubject.asObservable();
  }

  retrieveOrders(status: number): Observable<any> {
    return this.http.get<OrderModel[]>(this.baseUrl + "/orders/?status=" + status).map(orders => {
      this._orders = orders;
      this._ordersSubject.next(this._orders);
    });
  }

  createOrder(order: OrderModel): Observable<any> {
    return this.http.post<OrderModel>(this.baseUrl + '/orders/', order).map(createdOrder => {
      return createdOrder;
    });
  }

  nextStatus(order: OrderModel): Observable<any> {
    return this.http.get<OrderModel>(this.baseUrl + '/orders/' + order.id + '/next_status/').map(updatedOrder => {
      return updatedOrder;
    });
  }

  addToCart(product: ProductModel, quantity: number): Observable<any> {
    // create an OrderModel
    let order = new OrderModel();
    order.status = 0;
    order.provider = product.provider;

    return this.http.post<OrderModel>(this.baseUrl + '/cart/', {product: product, quantity: quantity});
  }
}
