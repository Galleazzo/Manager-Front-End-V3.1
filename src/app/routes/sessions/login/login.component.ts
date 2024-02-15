import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

import { AuthService, LoginService, TokenService } from '@core/authentication';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  isSubmitting = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message = 'Login ou senha incorreta.';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 10000;
  addExtraClass = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: LoginService, private tokenService: TokenService, private _dir: Directionality, public snackBar: MatSnackBar) {
  }
  

  loginForm = this.fb.nonNullable.group({
    username: ['paulinho@gmail.com', [Validators.required]],
    password: ['123456', [Validators.required]]
  });

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    this.isSubmitting = true;

    this.tokenService.clear();
    this.auth.login(this.loginForm.value).subscribe((response: any) => {

      this.tokenService.setToken(response.token)

      this.router.navigateByUrl('/');
    }, (error) => {
      const config = this._createConfig();
      this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    });
  }



  private _createConfig() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = this.addExtraClass ? ['demo-party'] : undefined;
    config.direction = this._dir.value;
    return config;
  }
}
