import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl + '/token';
  isLoggedIn = false;
  redirectUrl: string; // store the URL so we can redirect after logging in
  token: string;

  verifyToken(): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + '/verify/', {'token': this.token}).map(
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

  refreshToken(): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + '/refresh/', {'token': this.token}).map(
      response => {
        this.isLoggedIn = true;
        this.token = response.token;
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
    return this.http.post<any>(this.baseUrl + '/auth/', data).map(
      response => {
        if (response.hasOwnProperty('token')) {
          this.token = response.token;
        }
        this.isLoggedIn = true;
        return true;
      },
      error => {
        this.isLoggedIn = false;
        return false;
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
