import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UserModel} from "./user.model";
import {environment} from "../../environments/environment";
import {of} from "rxjs/observable/of";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.apiUrl + '/users';
  users: UserModel[];

  retrieveUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl + '/').map(response => {
      this.users = response;
      return this.users;
    });
  }
  hasPermission(user: UserModel, permission: string): boolean {
    return true;
  }
}
