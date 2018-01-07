import { Component, OnInit } from '@angular/core';
import {TeamsService} from "./teams.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams = this.teamsService.getTeams();
  loading = false;

  constructor(
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.teamsService.retrieveTeams().subscribe(response => {
      this.loading = false;
    });
  }

}
