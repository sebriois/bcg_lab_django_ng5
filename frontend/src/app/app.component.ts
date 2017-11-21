import {Component, isDevMode, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mode = 'DEV';

  ngOnInit() {
    if (isDevMode()) {
      this.mode = undefined;
    }
  }
}
