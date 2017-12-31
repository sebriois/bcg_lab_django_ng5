import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UserModel} from "./users/user.model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.apiUrl + '/users/';
  protected _usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);

  getUsers(): Observable<UserModel[]> {
    return this._usersSubject.asObservable();
  }

  retrieveUsers(): Observable<any> {
    return this.http.get<UserModel[]>(this.baseUrl).map(response => {
      this._usersSubject.next(response);
    });
  }
}
