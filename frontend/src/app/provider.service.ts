import {Injectable, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {ProviderModel} from './providers/providers.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


@Injectable()
export class ProviderService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.apiUrl + '/providers/';
  public pagination = {
    totalItems: 0,
    itemsPerPage: 50,
    currentPage: 1,
    nextPage: null,
    prevPage: null
  };
  private _providers: Array<ProviderModel> = [];

  protected _providersSubject: BehaviorSubject<ProviderModel[]> = new BehaviorSubject<ProviderModel[]>([]);

  getProviders(): Observable<ProviderModel[]> {
    return this._providersSubject.asObservable();
  }

  retrieveProviders(page: number): Observable<any> {
    return this.http.get<ProviderModel[]>(this.baseUrl + '?page=' + page).map(response => {
      this._providers = response['results'];

      this.pagination.totalItems = response['count'];
      this.pagination.currentPage = page;
      this.pagination.nextPage = response['next'];
      this.pagination.prevPage = response['previous'];

      this._providersSubject.next(this._providers);
    });
  }

  createProvider(provider: ProviderModel): Observable<any> {
    return this.http.post<ProviderModel>(this.baseUrl, provider).map(createdProvider => {
      return createdProvider;
    });
  }
}
