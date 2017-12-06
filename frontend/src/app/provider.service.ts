import {Injectable, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {ProviderModel} from './providers/providers.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


@Injectable()
export class ProviderService {
  private baseUrl: string = environment.apiUrl + '/providers/';
  private _providers: Array<ProviderModel> = [];
  protected _subject: BehaviorSubject<ProviderModel[]> = new BehaviorSubject<ProviderModel[]>([]);

  constructor(private http: HttpClient) {}

  getProviders(): Observable<ProviderModel[]> {
    return this._subject.asObservable();
  }

  retrieveProviders(): Observable<any> {
    return this.http.get<ProviderModel[]>(this.baseUrl).map(response => {
      this._providers = response['results'];
      this._subject.next(this._providers);
    });
  }

  createProvider(provider: ProviderModel): Observable<any> {
    return this.http.post<ProviderModel>(this.baseUrl, provider).map(createdProvider => {
      this._providers.push(createdProvider);
      this._subject.next(this._providers);
      return createdProvider;
    });
  }
}
