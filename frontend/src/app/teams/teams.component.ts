import { Component, OnInit } from '@angular/core';
import {TeamsService} from './teams.service';
import {AuthService} from '../auth/auth.service';
import {MemberModel} from './teams.model';
import {UserService} from '../users/user.service';

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
  isMe(member: MemberModel): boolean {
    return member.user.id === this.currentUser.id;
  }
  can(permission: string): boolean {
    return this.userService.hasPermission(this.currentUser, permission);
  }
}
