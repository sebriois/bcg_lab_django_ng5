import {Injectable, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Provider} from './providers/providers.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ProviderService {
  private _providers: Array<Provider> = [];
  protected _subject: BehaviorSubject<Provider[]> = new BehaviorSubject<Provider[]>([]);

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    return this._subject.asObservable();
  }

  retrieveProviders() {
    this.http.get<Provider[]>(environment.apiUrl + '/providers/').subscribe(providers => {
      this._providers = providers;
      this._subject.next(this._providers);
    });
  }

  createProvider(provider: Provider) {
    this.http.post<Provider>(environment.apiUrl + '/providers/', provider).subscribe(provider => {
      this._providers.push(provider);
      this._subject.next(this._providers);
    });
  }
}
