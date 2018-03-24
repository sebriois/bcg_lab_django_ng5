import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../alerts/alerts.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    if (this.authService.isLoggedIn()) {
      setTimeout(
        this.authService.refreshToken().subscribe(hasNewToken => {
            console.log('has new token', hasNewToken);
          },
          error => {
            console.log(error);
          }),
        this.authService.expiration * 1000
      );
    }
  }

  login() {
    const credentials = this.loginForm.value;
    this.submitted = true;
    this.authService.login(credentials.username, credentials.password).subscribe(
      isLoggedIn => {
        console.log('logged in:', isLoggedIn);
        this.submitted = false;
        this.router.navigate([this.authService.redirectUrl]);
      },
      errorMsg => {
        this.alertService.error(errorMsg);
      }
    );
  }
}
