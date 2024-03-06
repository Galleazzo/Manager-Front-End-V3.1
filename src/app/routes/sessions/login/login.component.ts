import { HttpErrorResponse } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, finalize } from 'rxjs';

import { AuthService, LoginService } from '@core/authentication';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  isSubmitting = false;

  @ViewChild('template') template!: TemplateRef<any>;
  message = 'Usuario ou senha incorretos!';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 3000;
  addExtraClass = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private _dir: Directionality
  ) { }

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
    }, (error) => {
      const config = this._createConfig();
      this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    })
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
