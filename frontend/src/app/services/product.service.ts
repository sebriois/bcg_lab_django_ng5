import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ProductModel} from '../models/products.model';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';


@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.apiUrl + '/products/';
  public pagination = {
    totalItems: 0,
    itemsPerPage: 50,
    currentPage: 1,
    nextPage: null,
    prevPage: null
  };
  private _products: Array<ProductModel> = [];
  protected _productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  getProducts(): Observable<ProductModel[]> {
    return this._productsSubject.asObservable();
  }

  retrieveProducts(page:number): Observable<any> {
    return this.http.get<ProductModel[]>(this.baseUrl + "?page=" + page).map(response => {
      this.pagination.totalItems = response['count'];
      this.pagination.currentPage = page;
      this.pagination.nextPage = response['next'];
      this.pagination.prevPage = response['previous'];
      this._products = response['results'];
      this._productsSubject.next(this._products);
    });
  }

  createProduct(product: ProductModel): Observable<any> {
    return this.http.post<ProductModel>(this.baseUrl, product).map(createdProduct => {
      return createdProduct;
    });
  }
}
