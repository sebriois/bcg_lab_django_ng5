import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {TeamModel} from '../teams/teams.model';

@Injectable()
export class TeamsService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.apiUrl + '/teams/';
  protected _teamsSubject: BehaviorSubject<TeamModel[]> = new BehaviorSubject<TeamModel[]>([]);

  getTeams(): Observable<TeamModel[]> {
    return this._teamsSubject.asObservable();
  }

  retrieveTeams(): Observable<any> {
    return this.http.get<TeamModel[]>(this.baseUrl).map(response => {
      this._teamsSubject.next(response);
    });
  }
}
