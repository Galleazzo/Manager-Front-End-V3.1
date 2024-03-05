import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, finalize } from 'rxjs';

import { AuthService, LoginService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: ['admin', [Validators.required]],
    password: ['15102003', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private loginService: LoginService
  ) {}

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    this.isSubmitting = true;

    this.loginService.login(this.loginForm.value).pipe(finalize(() => {
      this.router.navigateByUrl('/');
      this.isSubmitting = false
    })).subscribe((response: any) => {
      this.loginService.saveToken(response.token);
      
    },(error) => {
      console.log("SEM AUTORIZAÇÃO");
      
      this.router.navigateByUrl("/auth/login")
    })
  }
}
