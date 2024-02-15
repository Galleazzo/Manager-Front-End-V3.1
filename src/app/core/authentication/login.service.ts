import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Menu, TokenService } from '@core';
import { Token, User } from './interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient, private tokenService: TokenService) {}
  

  login(body: any) {
    return this.http.post<Token>(environment.server + '/auth/login', body);
  }

  isTokenValid() {
    var tokenValue = this.tokenService.getToken();
    return this.http.get<Boolean>(environment.server + `/auth/checkToken?token=${tokenValue}`)
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
