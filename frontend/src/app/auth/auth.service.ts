import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl + '/auth';
  private expiration = 300;  // seconds
  token: string;
  username: string;
  isLoggedIn = false;
  lastTokenRefresh: number;
  redirectUrl = '/'; // store the URL so we can redirect after logging in

  getAuthorizationHeader(): string {
    return 'JWT ' + this.token;
  }

  verifyToken(): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + '/verify-token/', {'token': this.token}).map(
      response => {
        this.isLoggedIn = true;
        return true;
      },
      error => {
        this.isLoggedIn = false;
        return false;
      }
    );
  }

  /* Should refresh token a bit before it expires */
  shouldRefresh(): boolean {
    console.log("now: " + Date.now());
    console.log("will expire: " + (this.lastTokenRefresh + (0.9 * this.expiration * 1000)));

    return (this.lastTokenRefresh + (0.9 * this.expiration * 1000)) < Date.now();
  }

  refreshToken(): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + '/refresh-token/', {'token': this.token}).map(
      response => {
        this.isLoggedIn = true;
        this.token = response.token;
        this.lastTokenRefresh = Date.now();
        return true;
      },
      error => {
        this.isLoggedIn = false;
        return false;
      }
    );
  }

  login(username: string, password: string): Observable<boolean> {
    let data = {
      username: username,
      password: password
    };
    return this.http.post<any>(this.baseUrl + '/login/', data).map(
      response => {
        if (response.hasOwnProperty('token')) {
          this.token = response.token;
          this.lastTokenRefresh = Date.now();
        }
        this.username = data.username;
        this.isLoggedIn = true;
        return true;
      },
      error => {
        this.username = undefined;
        this.isLoggedIn = false;
        return false;
      }
    );
  }

  logout(): void {
    console.log("signing out");
    this.username = undefined;
    this.isLoggedIn = false;
  }

}
