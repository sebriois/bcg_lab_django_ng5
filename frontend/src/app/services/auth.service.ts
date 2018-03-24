import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';
import {UserModel} from '../users/user.model';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ProductModel} from '../products/products.model';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  private baseUrl = environment.apiUrl + '/auth';
  protected _currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  public expiration = 300;  // seconds

  redirectUrl = '/'; // store the URL so we can redirect after logging in

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('currentUser');
  }

  getAuthorizationHeader(): string {
    return 'JWT ' + localStorage.getItem('token');
  }

  getCurrentUser(): Observable<UserModel> {
    return this._currentUserSubject.asObservable();
  }

  retrieveCurrentUser(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this._currentUserSubject.next(JSON.parse(currentUser));
    } else {
      localStorage.removeItem('token');  // will force login again
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  verifyToken(): Observable<boolean> {
    console.log('checking token: ' + localStorage.getItem('token'));
    return this.http.post<any>(this.baseUrl + '/verify-token/', {'token': localStorage.getItem('token')}).map(
      response => {
        console.log('-> valid token');
        return true;
      },
      error => {
        console.log('-> invalid token');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        return false;
      }
    );
  }

  refreshToken(): Observable<boolean> {
    console.log('refreshing token: ' + localStorage.getItem('token'));
    return this.http.post<any>(this.baseUrl + '/refresh-token/', {'token': localStorage.getItem('token')}).map(
      response => {
        console.log('-> got new token: ' + response.token);
        localStorage.setItem('token', response.token);
        return true;
      },
      error => {
        console.log('-> could not get new token');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        return false;
      }
    );
  }

  login(username: string, password: string): Observable<boolean> {
    console.log('signing in ...');
    return this.http.post<any>(
      this.baseUrl + '/login/',
      {
        username: username,
        password: password
      }).flatMap(response => {
        if (response.hasOwnProperty('token')) {
          localStorage.setItem('token', response.token);
          console.log(response.token);
          return this.userService.retrieveUsers().map(users => {
            const currentUser = users.find(user => {
              return user.username === username;
            });
            console.log(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this._currentUserSubject.next(currentUser);
            return true;
          });
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          return Observable.of(false);
        }
      }
    );
  }

  logout(): void {
    console.log('signing out');
    this.redirectUrl = '/login';
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

}
