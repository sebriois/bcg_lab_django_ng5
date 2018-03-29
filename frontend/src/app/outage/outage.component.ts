import { Component, OnInit } from '@angular/core';
import {OutageService} from "../services/outage.service";

@Component({
  selector: 'app-outage',
  templateUrl: './outage.component.html',
  styleUrls: ['./outage.component.scss']
})
export class OutageComponent implements OnInit {

  constructor(
    private outageService: OutageService
  ) { }

  ngOnInit() {

  }

}
