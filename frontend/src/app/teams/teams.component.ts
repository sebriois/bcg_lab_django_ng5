import { Component, OnInit } from '@angular/core';
import {TeamsService} from '../services/teams.service';
import {AuthService} from '../services/auth.service';
import {MemberModel} from './teams.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams = this.teamsService.getTeams();
  currentUser = this.authService.getCurrentUser();
  loading = false;

  constructor(
    private teamsService: TeamsService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.teamsService.retrieveTeams().subscribe(response => {
      this.loading = false;
    });
  }
  can(permission: string): boolean {
    return this.userService.hasPermission(permission);
  }
}
