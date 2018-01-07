import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../alerts/alerts.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    let credentials = this.loginForm.value;
    this.submitted = true;
    this.authService.login(credentials.username, credentials.password).subscribe(
      next => {
        this.submitted = false;
        this.router.navigate([this.authService.redirectUrl]);
      },
      error => {
        this.submitted = false;
        this.alertService.error(error.message);
      }
    )
  }
}
