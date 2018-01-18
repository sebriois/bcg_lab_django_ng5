import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from '../users/user.service';
import {UserModel} from '../users/user.model';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}
  private baseUrl = environment.apiUrl + '/auth';

  private lastTokenRefresh: number;
  private expiration = 300;  // seconds

  redirectUrl = '/'; // store the URL so we can redirect after logging in

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('currentUser');
  }

  getAuthorizationHeader(): string {
    if (this.shouldRefresh()) {
      this.refreshToken();
    }
    return 'JWT ' + localStorage.getItem('token');
  }

  getCurrentUser(): UserModel {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    localStorage.removeItem('token');  // will force login again
    return null;
  }

  verifyToken(): Observable<boolean> {
    console.log('checking token');
    return this.http.post<any>(this.baseUrl + '/verify-token/', {'token': localStorage.getItem('token')}).map(
      response => {
        if (this.shouldRefresh()) {
          console.log('-> SHOULD REFRESH TOKEN!');
        } else {
          console.log('-> valid token');
        }
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

  /* Should refresh token a bit before it expires */
  shouldRefresh(): boolean {
    return (this.lastTokenRefresh + (0.9 * this.expiration * 1000)) < Date.now();
  }

  refreshToken(): Observable<boolean> {
    console.log('refreshing token: ' + localStorage.getItem('token'));
    return this.http.post<any>(this.baseUrl + '/refresh-token/', {'token': localStorage.getItem('token')}).map(
      response => {
        console.log('-> got new token: ' + response.token)
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
      }).map(
        response => {
          if (response.hasOwnProperty('token')) {
            localStorage.setItem('token', response.token);
            console.log('-> ok');
            console.log('retrieving user data...');
            this.userService.retrieveUsers().subscribe(users => {
              const currentUser = users.find(user => {
                return user.username === username;
              });
              localStorage.setItem('token', response.token);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.lastTokenRefresh = Date.now();
              console.log(currentUser);
            });
            setTimeout(() => true, 1000);
          } else {
            return false;
          }
        },
        error => {
          console.log('-> failed');
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          return false;
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
