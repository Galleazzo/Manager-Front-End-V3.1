import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Menu } from '@core';
import { Token, User } from './interface';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  constructor(protected http: HttpClient, private router: Router) {}

  login(loginBody: any) {
    return this.http.post<any>(environment.server + '/auth/login',  loginBody );
  }

  verifyToken(){
    return this.http.get<any>(environment.server + `/auth/checkToken?token=${this.getToken()}`)
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }

  saveToken(token: any) {
    localStorage.setItem("token", token);
  }

  getToken(){
    var token = localStorage.getItem("token");    
    return token;
  }
}
